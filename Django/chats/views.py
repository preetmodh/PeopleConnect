from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from .models import Chat,RecentChat
from .serializers import ChatSerializer,ChatRecentSerializer
from django.db.models import Q, query
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json
from notifications.models import Notification

# Create your views here.

class ChatListCreateView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request,*args,**kwargs):
        room_id=self.kwargs['chat_id']
        chat_id=sorted([str(self.request.user.id),str(room_id)])
        room_name = chat_id[0]+"_"+chat_id[1]
        queryset = Chat.objects.filter(room_name=room_name)
        serializer = ChatSerializer(queryset, many=True)
        current_user=self.request.user.id
        data={'messages':serializer.data,'current_user':current_user}
        return Response(data,status=200)

        
    def create(self, request, *args, **kwargs):
        room_id=self.kwargs['chat_id']
        chat_id=sorted([str(self.request.user.id),str(room_id)])
        room_name = chat_id[0]+"_"+chat_id[1]
        request.data['room_name']=room_name
        return super().create(request, *args, **kwargs)


class RecentChatListView(generics.ListAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request,*args,**kwargs):
        current_user=self.request.user
        queryset=RecentChat.objects.filter(Q(receiver=current_user) | Q(sender=current_user))
        serializer = ChatRecentSerializer(queryset, many=True)
        
        seenDict={}
        
        for i in serializer.data:
            
            if(i['is_seen']==False):
                seenDict[i['room_name']]=0
            else:
                seenDict[i['room_name']]=1
        data={'recent':serializer.data,'current_user':current_user.id,'seen':seenDict}
        return Response(data,status=200)
    
    def post(self,request,*args,**kwargs):
        current_user=self.request.user
        seendict=self.request.data.get('isSeen')
        RecentChat.objects.filter(room_name=self.request.data.get('room_name'),receiver=current_user).update(is_seen=True)
        for i in seendict:
            if seendict[i]==1:
                RecentChat.objects.filter(room_name=i,receiver=current_user).update(is_seen=True)

                
        channel_layer = get_channel_layer()
        
        count=Notification.objects.filter(is_seen=False,user=current_user).count()
        message_count=RecentChat.objects.filter(receiver=current_user,is_seen=False).count()
        data={'message_count':message_count,'count':count,'user':current_user.user_name,'profile_pic':current_user.picture}
        room_name="notif_room_for_user_"+str(current_user.id)

        async_to_sync(channel_layer.group_send)(
			 room_name,{
				'type' : 'notification_data',
				'value' : json.dumps(data)
			}

		)

        return Response(status=200)
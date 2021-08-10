from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from .models import Chat
from .serializers import ChatSerializer
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
        print(chat_id,room_name)
        data={'messages':serializer.data,'current_user':current_user}
        return Response(data,status=200)

        
    def create(self, request, *args, **kwargs):
        room_id=self.kwargs['chat_id']
        chat_id=sorted([str(self.request.user.id),str(room_id)])
        room_name = chat_id[0]+"_"+chat_id[1]
        request.data['room_name']=room_name
        return super().create(request, *args, **kwargs)



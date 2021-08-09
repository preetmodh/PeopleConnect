from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Chat
from .serializers import ChatSerializer
# Create your views here.

class ChatListCreateView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        room_id=self.kwargs['chat_id']
        chat_id=sorted([str(self.request.user.id),str(room_id)])
        room_name = chat_id[0]+"_"+chat_id[1]
        return Chat.objects.filter(room_id=room_name)
    def create(self, request, *args, **kwargs):
        room_id=self.kwargs['chat_id']
        chat_id=sorted([str(self.request.user.id),str(room_id)])
        room_name = chat_id[0]+"_"+chat_id[1]
        request.data['room_name']=room_name
        return super().create(request, *args, **kwargs)



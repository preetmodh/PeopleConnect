from django.shortcuts import render
from .models import TodoData
from .serializers import TodoSerializer
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from users.models import User


class ToDoCreateList(generics.ListCreateAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=TodoSerializer
    
    def get_queryset(self):
        user=self.request.user
        return (TodoData.objects.filter(author=user))
    def post(self, request, *args, **kwargs):
        request.data['author']=request.user.id
        return self.create(request, *args, **kwargs)
class ToDoRetUpdDest(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=TodoSerializer
    queryset=TodoData.objects.all()
    def put(self, request, *args, **kwargs):
        request.data['author']=request.user.id
        return self.update(request, *args, **kwargs)
   
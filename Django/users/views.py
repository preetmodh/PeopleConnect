from django.shortcuts import render
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import CustomUserSerializer,CustomFollowSerializer
from .models import User,Follow
# Create your views here.



#to create a user
class CreateUserAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer

class CreateFollowAPIView(generics.ListCreateAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = Follow.objects.all()
    serializer_class = CustomFollowSerializer
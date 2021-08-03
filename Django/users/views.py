from django.shortcuts import render
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from .serializers import CustomUserSerializer,CustomFollowSerializer
from .models import User,Follow
from rest_framework.response import Response

import random

# Create your views here.



#to create a user
class CreateUserAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer

class CreateFollowAPIView(generics.ListCreateAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = Follow.objects.all()
    serializer_class = CustomFollowSerializer

class suggested_friends(generics.ListAPIView):
    authentication_classes=[TokenAuthentication,]
    # permission_classes=[is]
    def get(self, request, *args, **kwargs):
        
        friends=set()
        following_obj=Follow.objects.filter(follower=request.user)
        items = list(following_obj)
        following_obj_set=set(following_obj)
        someFollowingObjs = random.sample(items, int(len(items)/2))
        
        
        for i in range(len(someFollowingObjs)):
            following_id=someFollowingObjs[i].following
            following_following_obj=Follow.objects.filter(follower=following_id)
            items = list(following_following_obj)
            somefollowing_following_Objs = random.sample(items, int(len(items)/2))
            seti=set()
            
            for j in range(len(somefollowing_following_Objs)):
                if(somefollowing_following_Objs[j].following==request.user):
                    continue
                seti.add(somefollowing_following_Objs[j])

            for i in seti:
                friends.add(i)
        friends.difference(following_obj_set)
        
        data={'suggested_friends':[]}
        for i in friends:
            data['suggested_friends'].append(CustomUserSerializer( i.following).data)
            
        return Response(data,status=202)

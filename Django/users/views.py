from django.db import models
from django.shortcuts import render
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from .serializers import CustomUserSerializer,CustomFollowSerializer
from .models import User,Follow
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

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

class followers_followings(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        
        # print(request.query_params)
        typ=request.query_params['type']
        user=request.user
        data={}
        if typ=='followers':
            followers_obj=Follow.objects.filter(following=user)
            data['followers']=[]
            for i in followers_obj:
                data['followers'].append(CustomUserSerializer( i.follower).data)
        else:
            print('hellooo')
            following_obj=Follow.objects.filter(follower=user)
            data['following']=[]
            for i in following_obj:
                data['following'].append(CustomUserSerializer( i.following).data)
        return Response(data=data,status=200)

    def delete(self, request):
        typ=request.data['type']
        id=request.data['id']
        user=request.user
        data={}
        
        if typ=='followers':
            # objExist=get_object_or_404(follower=id,following=user)
            
            obj=get_object_or_404(Follow,follower=id,following=user)
            obj.delete()
            return Response('Deleted',status=200)
        else:
            obj=get_object_or_404(Follow,follower=user,following=id)
            obj.delete()
            return Response('Deleted',status=200)
            
    def post(self,request):
        id=request.data['following']
        user=request.user
        following_obj=User.objects.get(id=id)
        b = Follow (follower=user, following=following_obj)
        b.save()
        return Response('Followed',status=200)
    # def post(self, request, *args, **kwargs):
    #     request.data['follower']=request.user
        
    #     return self.create(request, *args, **kwargs)

        
      
from users.models import Follow
from posts.serializers import PostSerializer
from .models import Likes, Post
from django.shortcuts import render
from django.db import models
from django.shortcuts import render
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
# Create your views here.

class posts_particularUser(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


    def get(self,request):
        typ=request.query_params['type']
        user=request.user
        posts_data=[]
        likeDict={}
        if(typ=='profile'):
            posts_obj=Post.objects.filter(user=user)
            
            for i in posts_obj:
                posts_data.append(PostSerializer(i).data)
                try:
                    like=Likes.objects.get(user=user,post=i.id)
                    likeDict[i.id]=1
                except:
                    continue
                
        else:
            people_obj=[user]
            followers_obj=Follow.objects.filter(follower=user)
            for i in followers_obj:
                people_obj.append(i.following)
            
            posts_obj=Post.objects.filter(user__in=people_obj)
            
            
            for i in posts_obj:
                posts_data.append(PostSerializer(i).data)
            likes_objs=Likes.objects.filter(user=user)
            for i in likes_objs:
                likeDict[i.post.id]=1
        likeCountDict={}
        for i in posts_data:
            likeCountDict[i['id']]=i['likes']
        return Response(data={'posts_data':posts_data,'likeDict':likeDict,'likeCount':likeCountDict},status=200)
    def post(self,request,format=None):
        print(request.data)
        user=request.user
        data=request.data
        
        title=data['title']
        Image=data['Image']
        caption=data['caption']
        tags=data['tags']
        print(data)
        
        
        instance = Post.objects.create(user=user,title=title,Image=Image,caption=caption)
        instance.tags.set(tags)
        instance.save()
        return Response('Post Created',status=200)

class likeDislike(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self,request):
        post_id=request.data['post_id']
        user=request.user
        post_obj=Post.objects.get(id=post_id)
        b = Likes (post=post_obj, user=user)
        b.save()
        return Response('Liked',status=200)
    def delete(self, request):
        post_id=request.data['post_id']
        user=request.user
        obj=get_object_or_404(Likes,post=post_id,user=user)
        obj.delete()
        return Response('DisLiked',status=200)
        

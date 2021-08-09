from posts.serializers import PostSerializer
from .models import Post
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

# Create your views here.

class posts_particularUser(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


    def get(self,request):
        user=request.user
        posts_obj=Post.objects.filter(user=user)
        posts_data=[]
        for i in posts_obj:
            posts_data.append(PostSerializer(i).data)
        return Response(posts_data,status=200)
    def post(self,request,format=None):
        print(request.data)
        user=request.user
        data=request.data
        
        title=data['title']
        Image=data['Image']
        caption=data['caption']
        tags=data['tags']
        print(data)
        # obj = Post (user=user,title=title,Image=Image,caption=caption,tags=tags,
        #             )
        
        instance = Post.objects.create(user=user,title=title,Image=Image,caption=caption)
        instance.tags.set(tags)
        instance.save()
        return Response('Post Created',status=200)
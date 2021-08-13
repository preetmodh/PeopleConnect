

from django.db.models.query import QuerySet
from comments.models import Comment
from users.models import Follow
from posts.serializers import PostSerializer,LikeSerializer
from comments.serializers import CommentSerializer
from .models import Likes, Post
from django.shortcuts import render
from django.db import models
from django.shortcuts import render
from rest_framework import generics,pagination
from .pagination import postPagination
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator

# Create your views here.

class posts_particularUser(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    # pagination_class = postPagination
    

    def get(self,request,*args, **kwargs):
        typ=request.query_params['type']
        
        
        user=request.user
        posts_data=[]
        likeDict={}
        if(typ=='profile'):
            posts_obj=Post.objects.filter(user=user)
            paginator = Paginator(posts_obj, 2)
            page_number = request.GET.get('page')
            posts_obj = paginator.get_page(page_number)

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
            
            paginator = Paginator(posts_obj, 2)

            page_number = request.GET.get('page')
            posts_obj = paginator.get_page(page_number)
            likeDict={}
            for i in posts_obj:
                posts_data.append(PostSerializer(i).data)
                try:
                    tp=Likes.objects.get(user=user,post=i.id)
                    likeDict[i.id]=1
                except:
                    continue

            
        likeCountDict={}
        for i in posts_data:
            likeCountDict[i['id']]=i['likes']
            
        return Response(data={'posts_data':posts_data,'likeDict':likeDict,'likeCount':likeCountDict,'pageCnt':paginator.num_pages},status=200)
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
        
class SpecificPost(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    
    def get(self,request,*args, **kwargs):
        
        post_id=self.kwargs['pk']
        post_obj=Post.objects.get(id=post_id)
        like_objs=Likes.objects.filter(post=post_id)
        comment_objs=Comment.objects.filter(post=post_id)
        post_data=PostSerializer(post_obj).data
        
        likes=[]
        comments=[]
        isLiked=0
        
        for i in like_objs:
            data=LikeSerializer(i).data
            data['username']=i.user.user_name
            likes.append(data)
            if(i.user==request.user):
                isLiked=1

        for i in comment_objs:
            data=CommentSerializer(i).data
            data['username']=i.user.user_name
            comments.append(data)
        res_data={'post_data':post_data,'likes':likes,'comments':comments,'isLiked':isLiked}
        return Response(res_data,status=200)
        

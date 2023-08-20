

from users.models import User
from django.db.models.query import QuerySet
from comments.models import Comment
from users.models import Follow
from posts.serializers import PostSerializer,LikeSerializer
from comments.serializers import CommentSerializer
from .models import Likes, Post
from django.shortcuts import render
from rest_framework import generics,pagination
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator

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
        page_number = request.GET.get('page') or '0'
        if(typ=='profile'):
            user=User.objects.get(user_name=kwargs['username'])
            posts_obj=Post.objects.filter(user=user)
            paginator = Paginator(posts_obj, 4)
            posts_obj = paginator.get_page(page_number)

            for i in posts_obj:
                posts_data.append(PostSerializer(i).data)
                try:
                    like=Likes.objects.get(user=request.user,post=i.id)
                    likeDict[i.id]=1
                except:
                    continue
                
        else:
            people_obj=[user]
            followers_obj=Follow.objects.filter(follower=user)
            
            for i in followers_obj:
                people_obj.append(i.following)
            
            posts_obj=Post.objects.filter(user__in=people_obj)
            
            paginator = Paginator(posts_obj, 4)
            posts_obj = paginator.get_page(page_number)
            likeDict={}
            for i in posts_obj:
                posts_data.append(PostSerializer(i).data)
                try:
                    tp=Likes.objects.get(user=user,post=i.id)
                    likeDict[i.id]=1
                except:
                    continue
        pageCnt=posts_obj.paginator.num_pages
        if pageCnt<int(page_number):
            return Response('No more posts',status=404)
            
        likeCountDict={}
        for i in posts_data:
            likeCountDict[i['id']]=i['likes']
        
        return Response(data={'posts_data':posts_data,
            'likeDict':likeDict,
            'likeCount':likeCountDict,
            'pageCnt':pageCnt,
            'isCurrenUser':request.user==user,
            'userphoto' : user.picture,
            },
            status=200)
    def post(self,request,format=None,*args,**kwargs):
        user=request.user
        data=request.data
        
        title=data['title']
        Image=data['Image']
        caption=data['caption']
        tags=data['tags']
        
        
        instance = Post.objects.create(user=user,title=title,Image=Image,caption=caption)
        instance.tags.set(tags)
        instance.save()
        return Response('Post Created',status=200)

class likeDislike(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self,request,*args, **kwargs):
        post_id=request.data['post_id']
        user=request.user
        post_obj=Post.objects.get(id=post_id)
        b = Likes (post=post_obj, user=user)
        b.save()
        return Response('Liked',status=200)
    def delete(self,request,*args, **kwargs):
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
        comments=CommentSerializer(comment_objs,many=True).data
 
        res_data={'post_data':post_data,'likes':likes,'comments':comments,'isLiked':isLiked}
        return Response(res_data,status=200)
        

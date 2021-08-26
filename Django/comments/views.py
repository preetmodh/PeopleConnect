from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from .models import Comment
from .serializers import CommentSerializer
from rest_framework import pagination



class CommentView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):
        self.request.data['user']=self.request.user.id
        data=self.request.data
        serializer=CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=400)


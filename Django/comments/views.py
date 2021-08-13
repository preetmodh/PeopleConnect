from django.shortcuts import render
from rest_framework import generics
from .models import Comment
from .serializers import CommentSerializer
from rest_framework import pagination


class postPagination(pagination.PageNumberPagination):
    page_size = 2 

class CommentView(generics.ListAPIView):
    queryset=Comment.objects.all()
    serializer_class=CommentSerializer
    pagination_class=postPagination
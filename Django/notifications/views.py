from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from .models import Notification
# Create your views here.

#Create a APIview for the notifications in which we can get the notification count whose user is request.user and is_seen is false and give count as a get request response
class NotificationCountAPIView(APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        notifications = Notification.objects.filter(user=request.user,is_seen=False)
        count = notifications.count()
        return Response({'count':count})


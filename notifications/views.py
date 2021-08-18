from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer
# Create your views here.

#Create a APIview for the notifications in which we can get the notification count whose user is request.user and is_seen is false and give count as a get request response
class NotificationAPIView(generics.ListAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    def get_queryset(self):
        query_set = list(Notification.objects.filter(user=self.request.user))
        obj = Notification.objects.filter(user=self.request.user,is_seen=False)
        for i in obj:
            i.is_seen = True
            i.save()
        return query_set


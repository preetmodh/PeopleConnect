from rest_framework import serializers
from .models import Notification

#create a serializzers class for notification model
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

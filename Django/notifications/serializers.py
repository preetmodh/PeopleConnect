from rest_framework import serializers
from .models import Notification

#create a serializzers class for notification model in which a field is added which calculates how much time ago the notification was created
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id','post','user','notification_type','title','is_seen','get_date','get_sendername')


    




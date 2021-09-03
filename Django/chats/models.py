from django.db import models
from datetime import datetime
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json
from django.db.models.signals import post_save, post_delete
import timeago


# Create your models here.

class RecentChat(models.Model):
    from users.models import User
    sender=models.ForeignKey(User, on_delete=models.CASCADE)
    receiver=models.ForeignKey(User, on_delete=models.CASCADE,related_name="recent_receiver")
    created_at = models.DateTimeField(auto_now_add=True)
    room_name=models.CharField(max_length=100,unique=True,blank=True)
    is_seen=models.BooleanField(default=False)
    message = models.TextField()
    class Meta:
            ordering = ('-created_at',)
    def send_msg(self):
        return self.message[:20]
    def sendername(self):
        return self.sender.user_name
    def receivername(self):
        return self.receiver.user_name
    def get_time_ago(self):
        return timeago.format(self.created_at, datetime.now())

    def send_recent(sender, instance, *args, **kwargs):
        from .serializers import ChatRecentSerializer
        channel_layer = get_channel_layer()
        recent_data = ChatRecentSerializer(instance).data
        data={'recent_message':recent_data}
        room_name="chat_room_for_users_"+str(instance.receiver.id)
        async_to_sync(channel_layer.group_send)(
			 room_name,{       
				'type' : 'recent_data',
				'value' : json.dumps(data)
			}
		)

        room_name="chat_room_for_users_"+str(instance.sender.id)
        async_to_sync(channel_layer.group_send)(
			 room_name,{       
				'type' : 'recent_data',
				'value' : json.dumps(data)
			}
		)
        from notifications.models import Notification
        count=Notification.objects.filter(is_seen=False,user=instance.receiver).count()
        message_count=RecentChat.objects.filter(receiver=instance.receiver,is_seen=False).count()
        data={'message_count':message_count,'count':count,'user':instance.receiver.user_name,'profile_pic':instance.receiver.picture}
        room_name="notif_room_for_user_"+str(instance.receiver.id)

        async_to_sync(channel_layer.group_send)(
			 room_name,{
				'type' : 'notification_data',
				'value' : json.dumps(data)
			}

		)




        
class Chat(models.Model):
    from users.models import User
    sender=models.ForeignKey(User, on_delete=models.CASCADE)
    receiver=models.ForeignKey(User, on_delete=models.CASCADE,related_name="receiver")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    room_name=models.CharField(max_length=100,blank=True,null=True)
    is_seen=models.BooleanField(default=False)
    class Meta:
            ordering = ('created_at',)

    

    def __str__(self):
        return str(self.sender) + " "+self.message[:20]+" " + str(self.receiver)

    def sendername(self):
        return self.sender.user_name

    def get_time_ago(self):
        return timeago.format(self.created_at, datetime.now())


    def send_new_message(sender, instance, *args, **kwargs):
        from .serializers import ChatSerializer
        channel_layer = get_channel_layer()
        chat_data = ChatSerializer(instance).data
        data={'messages':chat_data}
        room_name="chat_room_for_users_"+''.join(instance.room_name)
        async_to_sync(channel_layer.group_send)(
			 room_name,{       
				'type' : 'chat_data',
				'value' : json.dumps(data)
			}
		)
        
        try:
            recent=RecentChat.objects.get(room_name=instance.room_name,)
            recent.delete()
            is_seen=instance.is_seen
            if instance.sender==instance.receiver:
                is_seen=True
            recent_chat=RecentChat(receiver=instance.receiver,
                                    sender=instance.sender,
                                    room_name=instance.room_name,
                                    message=instance.message,
                                    is_seen=is_seen)
            recent_chat.save()
        except:
            is_seen=instance.is_seen
            if instance.sender==instance.receiver:
                is_seen=True
            recent_chat=RecentChat(receiver=instance.receiver,
                                    sender=instance.sender,
                                    room_name=instance.room_name,
                                    message=instance.message,
                                    is_seen=is_seen)
            recent_chat.save()


post_save.connect(Chat.send_new_message, sender=Chat)	
post_save.connect(RecentChat.send_recent, sender=RecentChat)
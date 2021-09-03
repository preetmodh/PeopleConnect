
from django.db import models
from django.conf import settings
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json
from datetime import datetime
from django.db.models.signals import post_save, post_delete
import timeago
#from posts.models import Post

User=settings.AUTH_USER_MODEL
# Create your models here.
class Notification(models.Model):
	NOTIFICATION_TYPES = ((1,'Like'),(2,'Comment'), (3,'Follow'))

	post = models.ForeignKey('posts.Post', on_delete=models.CASCADE, related_name="noti_post", blank=True, null=True)
	sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="noti_from_user")
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="noti_to_user")
	notification_type = models.IntegerField(choices=NOTIFICATION_TYPES)
	title = models.CharField(max_length=90, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	is_seen = models.BooleanField(default=False)

	class Meta:
            ordering = ('-created_at',)
			

	def get_sendername(self):
		return self.sender.user_name

	def get_time_ago(self):
		return timeago.format(self.created_at, datetime.now())

	


	def notificationSave(sender, instance,*args,**kwargs):
		from chats.models import RecentChat
		channel_layer = get_channel_layer()
		count=Notification.objects.filter(is_seen=False,user=instance.user).count()
		message_count=RecentChat.objects.filter(receiver=instance.user,is_seen=False).count()
		data={'message_count':message_count,'count':count,'user':instance.user.user_name,'profile_pic':instance.user.picture}
		room_name="notif_room_for_user_"+str(instance.user.id)
		async_to_sync(channel_layer.group_send)(
			 room_name,{
				'type' : 'notification_data',
				'value' : json.dumps(data)
			}

		)

		
	def notificationDelete(sender, instance, *args, **kwargs):
		from chats.models import RecentChat
		channel_layer = get_channel_layer()
		count=Notification.objects.filter(is_seen=False,user=instance.user).count()
		message_count=RecentChat.objects.filter(receiver=instance.user,is_seen=False).count()
		data={'message_count':message_count,'count':count,'user':instance.user.user_name,'profile_pic':instance.user.picture}
		room_name="notif_room_for_user_"+str(instance.user.id)
		async_to_sync(channel_layer.group_send)(
			 room_name,{
				'type' : 'notification_data',
				'value' : json.dumps(data)
			}

		)
		
post_save.connect(Notification.notificationSave, sender=Notification)		
post_delete.connect(Notification.notificationDelete, sender=Notification)
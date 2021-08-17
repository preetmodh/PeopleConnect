
from django.db import models
from django.conf import settings
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json
from datetime import datetime
from django.db.models.signals import post_save, post_delete
#from posts.models import Post


# Create your models here.
class Notification(models.Model):
	from users.models import User
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
		
		time = datetime.now()
		if self.created_at == None:
			return None
		if  self.created_at.minute == time.minute and self.created_at.hour == time.hour and self.created_at.day == time.day:
			return "Now"
		elif  self.created_at.hour == time.hour and self.created_at.day == time.day:
			return str(time.minute - self.created_at.minute) + " minutes ago"
		elif self.created_at.day == time.day:
			return str(time.hour - self.created_at.hour) + " hours ago"
		else:
			if self.created_at.month == time.month:
				return str(time.day - self.created_at.day) + " days ago"
			else:
				if self.created_at.year == time.year:
					return str(time.month - self.created_at.month) + " months ago"
		return str(self.created_at)

	def __str__(self):
		return str(self.sender)+' to '+str(self.user)


	def notificationSave(sender, instance,*args,**kwargs):
		channel_layer = get_channel_layer()
		
		count=Notification.objects.filter(is_seen=False,user=instance.user).count() 
		data={'count':count}
		room_name="notif_room_for_user_"+str(instance.user.id)
		async_to_sync(channel_layer.group_send)(
			 room_name,{
				'type' : 'notification_data',
				'value' : json.dumps(data)
			}

		)

		
	def notificationDelete(sender, instance, *args, **kwargs):
		channel_layer = get_channel_layer()
		count=Notification.objects.filter(is_seen=False,user=instance.user).count() 
		data={'count':count}
		room_name="notif_room_for_user_"+str(instance.user.id)
		async_to_sync(channel_layer.group_send)(
			 room_name,{
				'type' : 'notification_data',
				'value' : json.dumps(data)
			}

		)
		
post_save.connect(Notification.notificationSave, sender=Notification)		
post_delete.connect(Notification.notificationDelete, sender=Notification)
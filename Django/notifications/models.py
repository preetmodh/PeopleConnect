from django.db import models
from django.conf import settings
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json
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
	date = models.DateTimeField(auto_now_add=True)
	is_seen = models.BooleanField(default=False)

	def __str__(self):
		return str(self.sender)+' to '+str(self.user)

	def save(self,*args,**kwargs):
		channel_layer = get_channel_layer()

		count=Notification.objects.filter(is_seen=False,user=self.user).count() + 1 
		data={'count':count}
		s="notif_room_for_user_"+str(self.user.id)
		async_to_sync(channel_layer.group_send)(
			 s,{
				'type' : 'notification_data',
				'value' : json.dumps(data)
			}

		)

		super(Notification, self).save(*args,**kwargs)


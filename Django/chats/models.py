from django.db import models
from datetime import datetime
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json




# Create your models here.

class RecentChat(models.Model):
    from users.models import User
    sender=models.ForeignKey(User, on_delete=models.CASCADE)
    receiver=models.ForeignKey(User, on_delete=models.CASCADE,related_name="recent_receiver")
    created_at = models.DateTimeField(auto_now_add=True)
    room_name=models.CharField(max_length=100,blank=True,null=True)
    is_seen=models.BooleanField(default=False)
    class Meta:
            ordering = ('-created_at',)


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


    def save(self,*args,**kwargs):
        from .serializers import ChatSerializer
        channel_layer = get_channel_layer()
        chat_data = ChatSerializer(self).data
        data={'messages':chat_data}
        room_name="chat_room_for_users_"+''.join(self.room_name)
        async_to_sync(channel_layer.group_send)(
			 room_name,{
				'type' : 'chat_data',
				'value' : json.dumps(data)
			}
		)
        
        try:
            recent=RecentChat.objects.get(receiver=self.receiver,sender=self.sender)
            recent.delete()
            recent_chat=RecentChat(receiver=self.receiver,sender=self.sender,room_name=self.room_name)
            recent_chat.save()
        except:
            recent_chat=RecentChat(receiver=self.receiver,sender=self.sender,room_name=self.room_name)
            recent_chat.save()


        super(Chat, self).save(*args,**kwargs)
import json
from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Notification


class NotiConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        self.room_group_name = "notif_group_for_user_"+str(self.user.id)
        self.user_room_name = "notif_room_for_user_"+str(self.user.id)
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.user_room_name,
            self.channel_name
        )
        self.accept()

        count=Notification.objects.filter(is_seen=False,user=self.user).count()
        
        data={'count':count,'user':self.user.user_name,'profile_pic':self.user.picture}
        async_to_sync(self.channel_layer.group_send)(
			 self.user_room_name,{
				'type' : 'notification_data',
				'value' : json.dumps(data)
			}

		)

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']


    def notification_data(self, event):
        value=json.loads(event['value'])

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'value': value
        })) 
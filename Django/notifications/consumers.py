import json
from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync


class NotiConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = 'hello'
        self.room_group_name = 'hellogroup'
        self.user = self.scope["user"]
        self.user_room_name = "notif_room_for_user_"+str(self.user.id)
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.user_room_name,
            self.channel_name
        )

        self.accept()
        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_group_name,
        #     {
        #         'type': 'notification_data',
        #         'message': "HELLO THERE "
        #     }
        # )

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

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'message': message
            }
        )

    def notification_data(self, event):
        value=json.loads(event['value'])

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'value': value
        })) 
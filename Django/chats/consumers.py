import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from rest_framework.response import Response


# for one to one chat room
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        # retrive chat room_id from incoming url
        chat_id=self.scope["url_route"]["kwargs"]["chat_id"]
        chat_id=sorted([str(self.user.id),str(chat_id)])
        self.room_name=chat_id[0]+"_"+chat_id[1]
        self.user_room_name = "chat_room_for_users_"+self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.user_room_name,
            self.channel_name
        )
        self.accept()


    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.user_room_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        print(text_data)
        return Response(status=203)


    def chat_data(self, event):
        value=json.loads(event['value'])
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'value': value
        })) 
    

# for recent chat list
class ChatRecentConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        self.room_name=self.user.id
        
        self.user_room_name = "chat_room_for_users_"+str(self.room_name)
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.user_room_name,
            self.channel_name
        )
        self.accept()


    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.user_room_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        print(text_data)
        return Response(status=203)


    def recent_data(self,event):
        value=json.loads(event['value'])
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'value': value,
            'user':self.user.id
        })) 

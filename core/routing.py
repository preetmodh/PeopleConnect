from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .token_auth import TokenAuthMiddlewareStack
from notifications.consumers import *
from chats.consumers import *

application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddlewareStack(
        URLRouter([
            path('ws/noticount/',NotiConsumer.as_asgi()),
            path('ws/chat/<str:chat_id>/',ChatConsumer.as_asgi()),
            path('ws/recent/',ChatRecentConsumer.as_asgi()),
        ]))
    
})
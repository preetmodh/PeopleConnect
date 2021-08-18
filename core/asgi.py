import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from notifications.consumers import *
from chats.consumers import *
from django.urls import path
from .token_auth import TokenAuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    # Just HTTP for now. (We can add other protocols later.)

    "websocket": TokenAuthMiddlewareStack(
        URLRouter([
            path('ws/noticount/',NotiConsumer.as_asgi()),
            path('ws/chat/<str:chat_id>/',ChatConsumer.as_asgi()),
            path('ws/recent/',ChatRecentConsumer.as_asgi()),
        ]))
    
})
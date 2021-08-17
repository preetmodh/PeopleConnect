import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from notifications.consumers import *
from chats.consumers import *
from django.urls import path
from .token_auth import TokenAuthMiddlewareStack
from channels.routing import get_default_application
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
application = get_default_application()
application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddlewareStack(
        URLRouter([
            path('ws/noticount/',NotiConsumer.as_asgi()),
            path('ws/chat/<str:chat_id>/',ChatConsumer.as_asgi()),
            path('ws/recent/',ChatRecentConsumer.as_asgi()),
        ]))
    
})
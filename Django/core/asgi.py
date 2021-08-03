import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from notifications.consumers import *
from django.urls import path
from channels.auth import AuthMiddlewareStack
from .token_auth import TokenAuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    # Just HTTP for now. (We can add other protocols later.)

    "websocket": TokenAuthMiddlewareStack(
        URLRouter([
            path('ws/noticount/',NotiConsumer.as_asgi()),
        ]))
    
})
# myproject.myapi.utils.py
from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
import json
from rest_framework.authtoken.models import Token


@database_sync_to_async
def get_user(headers):
    headers=str(headers)
    headers=headers.replace("'", '')
    headers=headers.split("=")
    
    token_key = headers[1]
    token = Token.objects.get(key=token_key)
    if token == None:
        return AnonymousUser()
    return token.user
    

class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        headers = (scope['query_string'])
        if b'authorization' in headers:
            scope['user'] = await get_user(headers)
        return await self.inner(scope, receive, send)

TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))
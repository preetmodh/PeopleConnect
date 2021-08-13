from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/',include('users.urls')),
    path('chat/',include('chats.urls')),
    path('comments/',include('comments.urls')),
    path('notifications/',include('notifications.urls')),
    path('posts/',include('posts.urls')),
    
]

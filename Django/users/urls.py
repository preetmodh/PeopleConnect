from django.urls import path, include
from .views import CreateUserAPIView,CreateFollowAPIView, FindUser,suggested_friends,followers_followings,FindUser
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('auth/', (include('rest_framework.urls', namespace='rest_framework'))),
    path('token',obtain_auth_token),
    path('register',CreateUserAPIView.as_view()),
    path('follow',CreateFollowAPIView.as_view()),
    path('suggested_friends',suggested_friends.as_view()),
    path('followers_followings/<str:username>',followers_followings.as_view()),
    path('finduser/',FindUser.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
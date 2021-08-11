from django.urls import path, include
from .views import ChatListCreateView,RecentChatListView

urlpatterns = [
    path('inbox/<str:chat_id>/',ChatListCreateView.as_view()),
    path('recent/',RecentChatListView.as_view()),
]
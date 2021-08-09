from django.urls import path, include
from .views import ChatListCreateView

urlpatterns = [
    path('<str:chat_id>/',ChatListCreateView.as_view()),
]
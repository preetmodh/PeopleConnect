from django.urls import path, include
from .views import NotificationCountAPIView

urlpatterns = [
    path('count',NotificationCountAPIView.as_view()),
]
from django.urls import path, include

from .views import ToDoCreateList,ToDoRetUpdDest



urlpatterns = [
    path('',ToDoCreateList.as_view()),
    path('<int:pk>/',ToDoRetUpdDest.as_view()),
]
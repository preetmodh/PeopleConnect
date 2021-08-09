from django.contrib import admin
from .models import Chat
# Register your models here.

@admin.register(Chat)
class Chats(admin.ModelAdmin):
    list_display=('sender','receiver','message')
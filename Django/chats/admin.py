from django.contrib import admin
from .models import Chat,RecentChat
# Register your models here.

@admin.register(Chat)
class Chats(admin.ModelAdmin):
    list_display=('sender','receiver','message','created_at')

@admin.register(RecentChat)
class RecentChat(admin.ModelAdmin):
    list_display=('sender','receiver','created_at')


    
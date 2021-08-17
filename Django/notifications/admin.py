from django.contrib import admin
from .models import Notification
# Register your models here.

@admin.register(Notification)
class Notifications(admin.ModelAdmin):
    list_display=('id','notification_type','sender','user')
from django.contrib import admin
from .models import Notification
# Register your models here.

@admin.register(Notification)
class Notifications(admin.ModelAdmin):
    readonly_fields = ('created_at',)
    list_display=('id','notification_type','sender','user','created_at')
from django.contrib import admin
from .models import User,Follow
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_name', 'email')

@admin.register(Follow)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'follower', 'following')

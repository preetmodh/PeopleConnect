from django.contrib import admin
from .models import Post,Tag,Likes
# Register your models here.

@admin.register(Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user','likes')


@admin.register(Likes)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('user', 'post')
admin.site.register(Tag)
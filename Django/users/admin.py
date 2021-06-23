from django.contrib import admin
from .models import User,Follow
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    exclude = ('password',)
admin.site.register(Follow)

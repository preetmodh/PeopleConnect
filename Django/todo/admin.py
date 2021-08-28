from django.contrib import admin

from .models import TodoData


   
@admin.register(TodoData)
class todoAdmin(admin.ModelAdmin):
    list_display=('title','due_date','complete')



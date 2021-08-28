from rest_framework import serializers
from .models import TodoData

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model=TodoData
        fields = '__all__'


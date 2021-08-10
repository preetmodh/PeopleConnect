from rest_framework import serializers
from .models import Chat


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id','sender','receiver','message','room_name','get_time_ago','sendername','created_at')


    


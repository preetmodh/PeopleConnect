from rest_framework import serializers
from .models import Chat,RecentChat


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id','sender','receiver','message','room_name','get_time_ago','sendername')

class ChatRecentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecentChat
        fields = ('id','sender','receiver','send_msg','sendername','room_name','receivername','is_seen','get_time_ago')

    


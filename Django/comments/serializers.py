
from rest_framework import serializers

from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'post','user','username','body','time_ago')

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from posts.models import Post,Likes

class PostSerializer(serializers.ModelSerializer):
    # follower=serializers.CharField(source='follower.user_name')
    # following=serializers.CharField(source='following.user_name')
    class Meta:
        model = Post
        fields = ('id','title','Image','caption','posted','tags','username','likes','userphoto')
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = '__all__'
from rest_framework import serializers
from users.models import User,Follow
from rest_framework.authtoken.models import Token


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('id','email','user_name','picture','password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        Token.objects.create(user=instance)
        return instance

class CustomFollowSerializer(serializers.ModelSerializer):
    # follower=serializers.CharField(source='follower.user_name')
    # following=serializers.CharField(source='following.user_name')
    class Meta:
        model = Follow
        fields = '__all__'
        
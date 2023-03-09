from rest_framework import serializers
from user.models import Account
from user.serializer import UserSerializer
from .models import Channel, Message

class GetChannelSerializer(serializers.ModelSerializer):
    """Serializer for retrieving channels with full user data"""
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Channel
        fields = ('id','name','users','created_date')

class ChannelSerializer(serializers.ModelSerializer):
    """Serializer for updating, creating or delete channels"""
    class Meta:
        model = Channel
        fields = ('id','name','users')


class GetMessageSerializer(serializers.ModelSerializer):
    """Serializer for retrieving messages with full user and channels data"""
    user = UserSerializer(read_only=True)
    channel = GetChannelSerializer()
    class Meta:
        model = Message
        fields = ('id','channel','content', 'user','created_date')


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for updating, creating or delete messages"""
    class Meta:
        model = Message
        fields = ('id','channel','content')


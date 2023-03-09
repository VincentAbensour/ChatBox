from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from .models import Account

class UserSerializer(serializers.ModelSerializer):
    """ Serializers For The Account Object"""
    class Meta:
        model = Account
        fields = ["email","password","username","id"]
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8 }}

    def create(self, validated_data):
        """ Create the user with encrypted password"""
        return Account.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update The user"""
        user = super().update(instance,validated_data)
        return user


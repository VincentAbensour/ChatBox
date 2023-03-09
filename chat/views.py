from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import ChannelSerializer, GetChannelSerializer, MessageSerializer, GetMessageSerializer
from .models import Channel, Message


class ChannelView(viewsets.ModelViewSet):
    """View for the channels"""
    serializer_class = ChannelSerializer
    queryset = Channel.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list'  or self.action == 'retrieve':
            return GetChannelSerializer
        else:
            return ChannelSerializer

    def perform_create(self, serializer):
        """ Create a new message with the current user set as user """
        users = [self.request.user]
        serializer.save(users=users)

    def get_queryset(self):
        """Retrieve recipes linked to the authenticated user"""
        user = self.request.user
        return self.queryset.filter(users = user)


class MessageView(viewsets.ModelViewSet):
    """View for the messages"""

    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return GetMessageSerializer
        else:
            return MessageSerializer

    def perform_create(self, serializer):
        """ Create a new message with the current user set as user """
        serializer.save(user=self.request.user)


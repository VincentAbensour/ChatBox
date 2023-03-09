from .models import Account
from django.shortcuts import get_object_or_404
from .serializer import UserSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response

class UserViewSet(viewsets.ViewSet):
    """
    A ViewSet for listing and creating or retrieving users.
    """
    queryset = Account.objects.all()
    serializer = UserSerializer()

    def list(self, request):
        queryset = Account.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Account.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User Created.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
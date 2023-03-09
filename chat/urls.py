from django.urls import path, include
from .views import ChannelView, MessageView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('channel', ChannelView)
router.register('message', MessageView)


urlpatterns = [
    path('', include(router.urls)),
]

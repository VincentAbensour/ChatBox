from django.contrib import admin
from chat.models import Channel, Message


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    pass

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'channel', 'created_date')


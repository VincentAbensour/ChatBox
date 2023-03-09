from django.db import models
from user.models import Account

class Channel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    users = models.ManyToManyField(Account)
    created_date = models.DateTimeField(auto_now_add = True)

    def __str__(self) -> str:
        return self.name

class Message(models.Model):

    user = models.ForeignKey(Account, on_delete = models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete = models.CASCADE)
    content = models.TextField(blank=False)
    created_date = models.DateTimeField(auto_now_add = True)

    def __str__(self) -> str:
        return f"{self.channel.id} / {self.user.username} : {self.content[:5]}... "

from django.db import models
from django.contrib.auth.models import User


class ChatIDS(models.Model):
    chatid = models.CharField(max_length=200, null=True, blank=True, unique=True)

    def __str__(self):
        return self.chatid

"""
NOTES:
FIELDS EXPLANATION
----sender/receiver---
There are some fields that require a little bit of explanations
sender record the person who have sent the message, and receiver the one who receives. These 
fields will be different as per message. 
These fields will help in querrying user specific messages or messages for two people talking

----roomchatID----
In the frontend, we are creating a room id using the userid of a person who started a chart 
per every connection and receiver id. Example. starterid58sepreceiverid64

The thing is for two people that are talking , we want them to have same roomChatID all the 
times. So the first chatID to be saved becomes the default roomCHATID for that chat 
forever.

Effort is put on the counsumer to check is the roomChatId already exist, for every connection
if it does we pass saving it.
"""
class Messages(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages', null=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages', null=True)
    message = models.TextField(blank=True, null=True)
    pic = models.ImageField(null=True, blank=True, upload_to="messagesPictures/")
    is_pic = models.BooleanField(default=False)
    # pic = models.BinaryField(null=True, blank=True)
    roomchatID = models.ForeignKey(ChatIDS, on_delete=models.CASCADE, null=True, blank=True)
    opened = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

    def __str__(self):
        if self.is_pic == True:
            return str(self.id)
        else:
            return self.message

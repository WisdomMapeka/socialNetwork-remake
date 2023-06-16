from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(null=True, default="Notset", blank=True, upload_to="profilepictures/")
    location = models.CharField(max_length=300, default="Notset", null=True, blank=True)
    dob = models.DateTimeField(blank=True, null=True)
    religion = models.CharField(max_length=300, default="Notset", null=True, blank=True)
    hobbies = models.TextField(default="Notset")
    whastapp_no = models.CharField(max_length=300, null=True, blank=True)
    calls_no = models.CharField(max_length=300, null=True, blank=True)
    description = models.TextField(default="Notset")
    comments_on_off = models.BooleanField(default = False)
    restrict_comments = models.IntegerField(default=0)
    is_online = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    


class CommonFields(models.Model):
    title = models.CharField(max_length=300, null=True, blank=True)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete = models.CASCADE)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    number_of_shares = models.IntegerField(default=0)

    class Meta:
        abstract = True


"""
Friends
-This is how this works, when a user makes a friend request, we take his id and the id 
of the friend who is being requested, then save in the the request_sender and friend_request_sent_to_id respectively.

To see friend requests of the user, just filter using their id on the filed friend_request_sent_to_id
with the status pending. That means they have friend request that they have not attended to. 

To know failed sent request that filter with  request_sender and status rejected 
and notification_opened true.

Status takes 4 states, sent, accepted, rejected, pending. The requested will have the staus pending.
When he accept the request, the statuse changes to accepted. 
"""

request_status = (
    ("sent", "sent"),
    ("accepted", "accepted"),
    ("rejected","rejected"),
    ("pending", "pending")
)
class Friends(models.Model):
    request_sender = models.ForeignKey(User, on_delete = models.CASCADE, related_name="request_sender")
    friend_request_sent_to_id = models.ForeignKey(User, on_delete = models.CASCADE, related_name="friend_request_sent_to")
    status = models.CharField(max_length=100, choices=request_status, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    notification_opened = models.BooleanField(default=False)


    def __str__(self):
        return self.request_sender.username
    


class Post(CommonFields):
    uploaded_picture = models.ImageField(null=True, blank=True, upload_to="userpictures/")
    is_profile_pic = models.BooleanField(default = False)
    is_default_profile_pic = models.BooleanField(default = False)
    video = models.FileField(null=True, blank=True, upload_to="uservideos/")
    number_of_plays = models.IntegerField(default=0)

    def __str__(self):
        return self.description


class Comments(CommonFields):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)

    def __str__(self):
        if self.title:
            return self.title
        else:
            return self.id
        
class Repplies(CommonFields):
    comment = models.ForeignKey(Comments, on_delete=models.CASCADE, null=True, related_name="replied_comment")

    def __str__(self):
        if self.title:
            return self.title
        else:
            return self.id
    


class Messages(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages', null=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages', null=True)
    message = models.TextField(blank=True, null=True)
    pic = models.ImageField(null=True, blank=True, upload_to="messagesPictures/")
    opened = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

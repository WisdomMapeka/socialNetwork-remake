from rest_framework.response import Response
from rest_framework import viewsets
from main.models import UserProfile
from django.contrib.auth.models import User



# --------Update a user online status -----------------------
"""
Every time a user refresh a token which happens after every five minutes
the boolean is_online is updated to true to show that the user is online.
When a user logs out the status is updated to false.

******ISSUE
-When a user logged in, the online status is not updated right away, it will be updated 
with this endpoint after 5 minutes when the token is refreshed. THis is not a big issue.
I might fix it later on. But its not an emergency


******DATA EXPECTED
{
"user": type(id),
"is_online": type(bool True or False)
}

******DATA RETURNED
for now nothing meaningful is returned
"""
class updateUserOnlineStatusView(viewsets.ModelViewSet):
    http_method_names = ['post']

    def create(self, request):
        user = User.objects.get(id = request.data["user"])
        user_profile = user.userprofile
        user_profile.is_online = request.data["is_online"]
        user_profile.save()
        return Response("online status updated")
    



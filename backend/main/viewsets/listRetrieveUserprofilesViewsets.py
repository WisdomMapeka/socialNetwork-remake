from rest_framework.response import Response
from rest_framework import viewsets
from ..serializers.listRetrieveUserprofilesSerializers import ListRetrieveUserProfilesSerializer
from main.models import UserProfile
from django.contrib.auth.models import User
# ----------------------------------NOTES---------------------------------
"""
This viewset list all the userprofiles, it can also, retreave a single userprofile
if provided with the id of the user or some other lookup field
"""
# ------------------------ListRetrieveUserProfilesView----------------------------
class ListRetrieveUserProfilesView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ListRetrieveUserProfilesSerializer
    http_method_names = ['get']

    def list(self, request):
        queryset = User.objects.all().exclude(is_staff=True).order_by("-id")
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    
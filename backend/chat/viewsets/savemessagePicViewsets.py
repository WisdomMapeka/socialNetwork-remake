from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from ..serializers.savemessagePicSerializer import SaveMessagePicSerializer
from chat.models import Messages, ChatIDS
from django.contrib.auth.models import User
from PIL import Image
import io
import PIL
import sys
from django.core.files.uploadedfile import InMemoryUploadedFile
import os

"""
NOTES:
This endpoint is used to save a picture in the chats, to reduce burdan on the sockets.
It is also used to delete the messages in the chats.
They might be more uses of it in the future
"""
class SaveMessagePicView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = SaveMessagePicSerializer
    queryset =  Messages.objects.all()

    def delete(self, request):
        message = Messages.objects.get(id=request.data["id"])
        message.delete()
        return Response("deleted")

    
    
    def create(self, request):
        print("----------------------------savePic")
        print(request.data)
        data = request.data
        request.data._mutable = True
        data["roomchatID"] = ChatIDS.objects.get(chatid=request.data["roomchatID"]).id
        request.data._mutable = False
        print("----------------------------------------")
        print(data)
        serializer = self.serializer_class(data = data, context={'request': request})
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)
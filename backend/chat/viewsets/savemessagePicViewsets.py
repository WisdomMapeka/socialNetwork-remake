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

class SaveMessagePicView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = SaveMessagePicSerializer
    queryset =  Messages.objects.all()
    
    
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
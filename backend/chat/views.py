from django.shortcuts import render
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from main.models import Post, UserProfile
from django.contrib.auth.models import User
from PIL import Image
import io
import PIL
import sys
from django.core.files.uploadedfile import InMemoryUploadedFile
import os

class CheckuseridexistView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    
    
    def create(self, request):
        queryset = Post.objects.all()
        serializer = self.serializer_class(data = request.data, context={'request': request})
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)
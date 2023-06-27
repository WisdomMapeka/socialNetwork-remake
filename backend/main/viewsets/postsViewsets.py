from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from ..serializers.postsSerializers import PostSerializer
from ..serializers.signupSerializers import UserProfileSerializer, SignupSerializer
from main.models import Post, UserProfile
from django.contrib.auth.models import User
from PIL import Image
import io
import PIL
import sys
from django.core.files.uploadedfile import InMemoryUploadedFile
import os

class PostView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    serializer_class_users = UserProfileSerializer
    queryset = Post.objects.all()
    

    def list(self, request):
        queryset = Post.objects.all().order_by("-date_created")
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        return Response({"post":serializer.data})

    # def retrieve(self, request, pk=None):
    #     queryset = Post.objects.all()
    #     user = get_object_or_404(queryset, pk=pk)
    #     serializer = self.serializer_class(user)
    #     return Response(serializer.data)
    
    def create(self, request):
        queryset = Post.objects.all()
        serializer = self.serializer_class(data = request.data, context={'request': request})
        serializer.is_valid()
        serializer.save(created_by =self.request.user)
        return Response(serializer.data)
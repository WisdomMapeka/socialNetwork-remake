from rest_framework import serializers
from main.models import  Post, UserProfile
from django.contrib.auth.models import User
from .signupSerializers import SignupSerializer, UserProfileSerializer
import os
# from django.contrib.sites.models import Site
from django.db.utils import IntegrityError




class PostSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        user = User.objects.get(id=rep["created_by"])
        if user.is_staff==True:
            admin_name = "Admin "+user.username
            rep["created_by"] = admin_name
        else:
            user_data = SignupSerializer(user)
            returned_data = user_data.data
            returned_data.pop("password")
            
            user_profile = UserProfile.objects.get(user=user)
            profile = UserProfileSerializer(user_profile, context=self.context)

            final_data = returned_data.copy()
            final_data.update(profile.data)

            rep["created_by"] = final_data
        return rep
    
    class Meta:
        model = Post
        fields = "__all__"
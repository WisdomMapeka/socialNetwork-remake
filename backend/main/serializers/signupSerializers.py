from rest_framework import serializers
from main.models import  UserProfile
from django.contrib.auth.models import User



class SignupSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "password","username","email", "first_name", "last_name"]
        
        
# This is just to clean other fields above, that cannot be saved in the default user model   
class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = "__all__"
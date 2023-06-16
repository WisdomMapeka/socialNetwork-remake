from rest_framework import serializers
from main.models import  UserProfile
from django.contrib.auth.models import User


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "password","username","email", "first_name", "last_name"]
        
        
# This is just to clean other fields above, that cannot be saved in the default user model   
class UserProfileSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(queryset = User.objects.all())
    # username = serializers.CharField(max_length=300, required=False)
    # first_name = serializers.CharField(max_length=300, required=False)
    # last_name = serializers.CharField(max_length=300, required=False)
    # email = serializers.CharField(max_length=300, required=False)
    # profile_picture = serializers.ImageField(required=False)
    # location = serializers.CharField(max_length=300, required=False)
    # dateOfBirth = serializers.DateTimeField(required=False)
    # religion = serializers.CharField(max_length=300, allow_blank=True)
    # hobbies = serializers.CharField(max_length=300,  allow_blank=True)
    # description = serializers.CharField(max_length=300,  allow_blank=True)

    class Meta:
        model = UserProfile
        fields = "__all__"
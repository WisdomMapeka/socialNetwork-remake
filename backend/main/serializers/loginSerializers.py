from rest_framework import serializers
from django.contrib.auth.models import User


# register user serializer
class LoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["password","username","email", "first_name", "last_name"]
        
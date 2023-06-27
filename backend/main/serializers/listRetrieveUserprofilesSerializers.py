from rest_framework import serializers
from main.models import  UserProfile
from .signupSerializers import UserProfileSerializer
from django.contrib.auth.models import User
from collections import OrderedDict



class ListRetrieveUserProfilesSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        try:
            prof = UserProfileSerializer(instance.userprofile, context = self.context)
            data = OrderedDict(prof.data)
        except User.userprofile.RelatedObjectDoesNotExist:
            data = OrderedDict({})

        ret = super().to_representation(instance)
        ret.pop("password")
        final_data = ret.copy()
        final_data.update(data)

        return {"user":final_data}

    class Meta:
        model = User
        fields = ["id", "password","username","email", "first_name", "last_name"]
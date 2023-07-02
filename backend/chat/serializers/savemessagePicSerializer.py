from rest_framework import serializers
from chat.models import Messages, ChatIDS
from django.contrib.auth.models import User
import os
# from django.contrib.sites.models import Site
from django.db.utils import IntegrityError




class SaveMessagePicSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        return rep
    
    class Meta:
        model = Messages
        fields = "__all__"
from rest_framework import serializers
from chat.models import Messages, ChatIDS
from main.models import UserProfile
from main.serializers.signupSerializers import UserProfileSerializer, SignupSerializer
from django.contrib.auth.models import User



class MessagesListSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        userid = rep["sender"]
        print(userid)
        

        user = User.objects.get(id=rep["sender"])
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

            rep["sender"] = final_data
        return rep
    
    class Meta:
        model = Messages
        fields = "__all__"
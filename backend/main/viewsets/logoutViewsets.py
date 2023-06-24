from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers.loginSerializers import (LoginSerializer)
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import update_last_login, User



# --------Register User View -----------------------
class LogoutView(viewsets.ModelViewSet):
    serializer_class = LoginSerializer
    http_method_names = ['post']

    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid()
        # user_exist = User.objects.filter(username = serializer.data["username"]).exists()
        # print(user_exist)
        
        # if user_exist:

        user_data = authenticate(request, **serializer.data )
        if user_data is not None:
            print(user_data)
    
            logout(request)
            return Response({"message":"Logged out"})
            
        else:
            return Response({"message":"Something went wrong"})
        # return Response({"message":"Account with this username does not exist. Please consider creating an account"})
       
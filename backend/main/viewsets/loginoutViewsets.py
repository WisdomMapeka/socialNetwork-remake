from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers.loginSerializers import (LoginSerializer)
from ..serializers.signupSerializers import UserProfileSerializer, SignupSerializer
from django.contrib.auth import authenticate, login,  logout
from django.contrib.auth.models import update_last_login, User
from main.models import UserProfile
from django.contrib.auth.hashers import make_password
import os
from django.views.decorators.csrf import csrf_exempt



# --------Register User View -----------------------
class LoginView(viewsets.ModelViewSet):
    serializer_class = LoginSerializer
    serializer_profile_class = UserProfileSerializer
    http_method_names = ['post',]
    
    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid()
        user_exist = User.objects.filter(username = serializer.data["username"]).exists()
        if user_exist:
            user_data = authenticate(request, **serializer.data )
            if user_data is not None:
                login(request, user_data)
                update_last_login(None, user_data)
                user =  user_data

                de_serializer = self.serializer_class(user)
                retuned_data = de_serializer.data
                # if the corresponding  user.userprofile does not exist then this is going to spit and error
                # most likely a relatedObjectDoesNotExist or somthing. To avoit it, I must must follow 
                # what I did on the signupview
                de_serializer_profile = self.serializer_profile_class(user.userprofile, context={'request': request})
                profile_reurn_data = de_serializer_profile.data

                tokens = RefreshToken.for_user(user_data)
                token_data = {
                    "access":str(tokens.access_token),
                    "refresh":str(tokens)
                }
                
                retuned_data.pop("password")
                retuned_data["user"] = user.id

                final_data = retuned_data.copy()
                final_data.update(profile_reurn_data)

                res = Response({"user":final_data, "access":token_data["access"], 
                                "refresh":token_data["refresh"]},
                                status=status.HTTP_201_CREATED, )
                return res
            else:
                return Response({"error":"You have entered wrong password. Try again"})
        return Response({"error":"Account with this username does not exist. Please consider creating an account"})
    



# --------Register User View -----------------------
class LogoutView(viewsets.ModelViewSet):
    serializer_class = LoginSerializer
    http_method_names = ['post']

    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid()


        user_data = authenticate(request, **serializer.data )
        if user_data is not None:
            print(user_data)
    
            logout(request)
            return Response({"message":"Logged out"})
            
        else:
            return Response({"message":"Something went wrong"})

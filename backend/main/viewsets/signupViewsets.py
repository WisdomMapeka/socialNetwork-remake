from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers.signupSerializers import SignupSerializer, UserProfileSerializer
from main.models import UserProfile, Post
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User


# --------Register User View -----------------------
class SignupUserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    serializer_class_profile = UserProfileSerializer
    http_method_names = ['post', 'patch',]


    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid(raise_exception=True)    
        serializer.validated_data["password"] = make_password(serializer.validated_data["password"])
        user =  serializer.save()
        
        # this creates a user profile just one time when a user signup-------------
        default_profile_pic = Post.objects.filter(is_default_profile_pic=True, is_profile_pic=True).order_by("-id").first()
        if bool(default_profile_pic) == True:
            pic = default_profile_pic.uploaded_picture.name
        else:
            pic = ""
 
        create_userprofile = UserProfile.objects.create(user=user, profile_picture = pic)
        profile_data = {'id2': create_userprofile.id, 'user_id2': create_userprofile.user.id, 
                        'profile_picture': request.build_absolute_uri(create_userprofile.profile_picture.url), 
                        'whastapp_no':create_userprofile.whastapp_no,
                        'calls_no':create_userprofile.calls_no,
                        'location': create_userprofile.location, 'dob': create_userprofile.dob, 
                        'religion': create_userprofile.religion, 
                        'hobbies': create_userprofile.hobbies, 
                        'description': create_userprofile.description, 
                        'date_created': create_userprofile.date_created}
        
        profile = self.serializer_class_profile(data= profile_data)
        profile.is_valid()
        profile_reurn_data = profile.data
        # -------------------------------------------------------

    
        tokens = RefreshToken.for_user(user)
        token_data = {
            "access":str(tokens.access_token),
            "refresh":str(tokens)
        }

        retuned_data = serializer.data
        retuned_data.pop("password")
        retuned_data["user_id"] = user.id

        final_data = retuned_data.copy()
        final_data.update(profile_reurn_data)


        res = Response({"user":final_data,   "access":token_data["access"], 
                        "refresh":token_data["refresh"]},
                        status=status.HTTP_201_CREATED, 
                                    )
        
        return res
    

    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        data = request.data

        serializer = self.serializer_class(instance=instance,
                                        data=data, 
                                        partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # when we update the user data, we also want to retuen the profile data of this user
        # that is what this code does, if it happens that by some mistake the profile data has
        # been deleted, we try to recreate it with the code that follows the try
        # -------------------------------------------------------------------------
        try:
            user_profile = UserProfile.objects.get(user=user)
            profile_data = {'id2': user_profile.id, 'user_id2': user_profile.user.id, 
                            'whastapp_no':user_profile.whastapp_no,
                            'calls_no':user_profile.calls_no,
                            'profile_picture': request.build_absolute_uri(user_profile.profile_picture.url), 
                            'location': user_profile.location, 'dob': user_profile.dob, 
                            'religion': user_profile.religion, 
                            'hobbies': user_profile.hobbies, 
                            'description': user_profile.description, 
                            'date_created': user_profile.date_created}
            
            profile = self.serializer_class_profile(data= profile_data)
            profile.is_valid()
            profile_reurn_data = profile.data
        except UserProfile.DoesNotExist:
        # ----------------------------------------------------------------------------------
            # when we try to update user information, if the user does not exist in the user model
            # we try to recreate that user her
            
            default_profile_pic = Post.objects.filter(is_default_profile_pic=True, is_profile_pic=True).order_by("-id").first()
            if bool(default_profile_pic) == True:
                pic = default_profile_pic.uploaded_picture.name
            else:
                pic = ""
            
            create_userprofile = UserProfile.objects.create(user=user, profile_picture = pic)
            profile_data = {'id2': create_userprofile.id, 'user_id2': create_userprofile.user.id, 
                            'profile_picture': request.build_absolute_uri(create_userprofile.profile_picture.url), 
                            'whastapp_no':create_userprofile.whastapp_no,
                            'calls_no':create_userprofile.calls_no,
                            'location': create_userprofile.location, 'dob': create_userprofile.dob, 
                            'religion': create_userprofile.religion, 
                            'hobbies': create_userprofile.hobbies, 
                            'description': create_userprofile.description, 
                            'date_created': create_userprofile.date_created}
            
            profile = self.serializer_class_profile(data= profile_data)
            profile.is_valid()
            profile_reurn_data = profile.data
            # ----------------------------------------------------------


        tokens = RefreshToken.for_user(user)
        token_data = {
            "access":str(tokens.access_token),
            "refresh":str(tokens)
        }

        retuned_data = serializer.data
        retuned_data.pop("password")
        retuned_data["user_id"] = user.id

        final_data = retuned_data.copy()
        final_data.update(profile_reurn_data)

        res = Response({"user":final_data, "access":token_data["access"], 
                        "refresh":token_data["refresh"]},
                        status=status.HTTP_201_CREATED, 
                                    )
        
        return res



# --------Register User View -----------------------
class UserProfileView(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    serializer_class_signup = SignupSerializer
    http_method_names = ['post', 'patch',]
    lookup_field = "user"


    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        data = request.data
        print(pk)

        serializer = self.serializer_class(instance=instance,
                                        data=data, 
                                        partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        retuned_data = serializer.data
        retuned_data["profile_picture"] = request.build_absolute_uri(retuned_data["profile_picture"])
        print(retuned_data["user"])
        
        instance2 = User.objects.get(id=retuned_data["user"])
        serializer2 = self.serializer_class_signup(instance2, context={'request': request})
        data2 =  serializer2.data
        data2.pop("password")

        final_data = data2.copy()
        final_data.update(retuned_data)

    
        return Response({"user":final_data },  status=status.HTTP_201_CREATED)

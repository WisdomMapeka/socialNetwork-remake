from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers.signupSerializers import SignupSerializer
from main.models import UserProfile
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User


# --------Register User View -----------------------
class SignupUserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    http_method_names = ['post', 'patch',]

    def create(self, request):
        print("============signup=======================")
        print(request.data)
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid(raise_exception=True)    
        serializer.validated_data["password"] = make_password(serializer.validated_data["password"])
        user =  serializer.save()
        print(serializer.data)
    
    
        tokens = RefreshToken.for_user(user)
        token_data = {
            "access":str(tokens.access_token),
            "refresh":str(tokens)
        }

        retuned_data = serializer.data
        retuned_data.pop("password")
        retuned_data["user_id"] = user.id

        res = Response({"user":retuned_data, "access":token_data["access"], 
                        "refresh":token_data["refresh"]},
                        status=status.HTTP_201_CREATED, 
                                    )
        
        return res
    

    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        print(instance)
        print(request.data)
        print(pk)
        data = request.data

        serializer = self.serializer_class(instance=instance,
                                        data=data, 
                                        partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        retuned_data = serializer.data
        retuned_data.pop("password")
        return Response(data=retuned_data, status=status.HTTP_201_CREATED)



# --------Register User View -----------------------
# class SignUpAdditionalInfoView(viewsets.ModelViewSet):
#     queryset = Users.objects.all()
#     serializer_class_users = UsersSerializer
#     http_method_names = ['post', 'patch',]

#     def create(self, request):
#         user = User.objects.get(username = request.data.get("user", None))
#         user_from_users = Users.objects.filter(user = user.id).exists()
#         print('user on users --------------SignUpAdditionalInfoView----------------------')
#         print(user_from_users)
#         users_model_data = {'user': user.id,
#                             'location': request.data.get("location", None), 
#                             'dateOfBirth': request.data.get("dateOfBirth", None), 
#                             'religion': request.data.get("religion", None), 
#                             'hobbies': request.data.get("hobbies", None), 
#                             'description': request.data.get("description", None)}
#         serializer = self.serializer_class_users(data = users_model_data)
#         serializer.is_valid()
#         if user_from_users == True:
#             pass
#         else:
#             serializer.save()

#         tokens = RefreshToken.for_user(user)
#         token_data = {
#             "access":str(tokens.access_token),
#             "refresh":str(tokens)
#         }

#         retuned_data = serializer.data
#         retuned_data['user_id'] = user.id
#         retuned_data['username'] = user.username
#         retuned_data['first_name'] = user.first_name
#         retuned_data['last_name'] = user.last_name
#         retuned_data['email'] = user.email

#         a = Response()
#         print(a)
#         res = Response({"user":retuned_data, "access":token_data["access"], 
#                         "refresh":token_data["refresh"]},
#                         status=status.HTTP_201_CREATED, 
#                                     )
        
#         return res
    
#     def update(self, request, pk=None, *args, **kwargs):
#         instance = self.get_object()
#         print(instance.hobbies)
#         print(request.data)
#         data = request.data

#         serializer = self.serializer_class_users(instance=instance,
#                                         data=data, 
#                                         partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         retuned_data = serializer.data
#         return Response(data=retuned_data, status=status.HTTP_201_CREATED)

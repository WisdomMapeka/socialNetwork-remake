from django.urls import path, include, re_path
from .viewsets import *
from . import views
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'signup', signupViewsets.SignupUserView,  'signup')
router.register(r'userprofile', signupViewsets.UserProfileView, "userprofile")


urlpatterns = [
    path('', views.index, name="index"),
    path('', include(router.urls)),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # re_path(r'.*', views.index)
]
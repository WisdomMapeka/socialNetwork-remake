from django.urls import path, include, re_path
from .viewsets import *
from . import views
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'checkchatid', checkchatid.CheckchatIdView,  'checkchatid')


urlpatterns = [
    path('', include(router.urls)),
    # re_path(r'.*', views.index)
]
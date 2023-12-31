from django.urls import path, include, re_path
from .viewsets import *
from . import views
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'checkchatid', checkchatidViewsets.CheckchatIdView,  'checkchatid')
router.register(r'savemessagepic', savemessagePicViewsets.SaveMessagePicView, 'savemessagepic')
router.register(r'messageslist', messagesListViewsets.MessagesListView, 'messageslist')


urlpatterns = [
    path('', include(router.urls)),
    # re_path(r'.*', views.index)
]
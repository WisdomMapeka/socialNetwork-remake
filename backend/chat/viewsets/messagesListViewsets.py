from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers.messageListSerializer import MessagesListSerializer
from chat.models import Messages, ChatIDS
from django.contrib.auth.models import User


"""
NOTES:
This endpoint is used to list recent 30 messages sent and their users, or message senders.
"""
class MessagesListView(viewsets.ModelViewSet):
    serializer_class = MessagesListSerializer
    queryset = Messages.objects.all()

    def list(self, request):
        # print(request.GET)
        q = Messages.objects.filter(receiver = request.GET.get("user"))
        # '''
        # This code remove any duplicates in the chatlists
        # '''
        wanted_items = set()
        for item in q:
            wanted_items.add(item.sender)
        
        queryset = Messages.objects.none()
        for i in wanted_items:
            queryset |=  Messages.objects.filter(sender = i, receiver = request.GET.get("user"))[:1]


        serializer = self.serializer_class(queryset, many=True,  context={'request': request})
        # print(serializer.data)
        return Response({"recent_messages":serializer.data})

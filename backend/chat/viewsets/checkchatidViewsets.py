from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from chat.models import ChatIDS



"""
NOTES:
This endpoint is used to check if a roomChat id exists , if it does return it , if it does not
exists, that will mean that such a chat is new, so we will send the chat id
from the frontend which will then be saved in the chatIDS model.

To do the check we construct two possible values of a chatID, if any of these exist then, we 
return is as the default chatID which will be used for that chat forever.

The logic behind these two is the. If two users start talking USERA and USERB.
If userA starts the chat then the roomCHATID will be starteridUSERAreceiveridUSERB.

Where as if UserB starts it will be starteridUSERBreceiveridUSERA. Any of these will be 
used as the default chatID forever. Depending on who started the chat.
"""
class CheckchatIdView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = ChatIDS.objects.all()

    
    def create(self, request):

        chatid1 = "starterid" + str(request.data["starterID"]) + "sep" + "receiverid" + str(request.data["receiverID"])
        chatid2 = "starterid" + str(request.data["receiverID"]) + "sep" + "receiverid" + str(request.data["starterID"])

        getchatid1 = ChatIDS.objects.filter(chatid=chatid1).exists()
        getchatid2 = ChatIDS.objects.filter(chatid=chatid2).exists()


        if getchatid1 == True:
            return Response(chatid1)
        elif getchatid2 == True:
            return Response(chatid2)
        elif getchatid1 == False and getchatid2 == False:
            return Response(chatid1) 
        return Response(chatid1)
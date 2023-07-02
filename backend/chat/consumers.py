import json
from .models import ChatIDS, Messages
from asgiref.sync import async_to_sync, sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import WebsocketConsumer
from django.db.utils import IntegrityError
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth.models import User


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = self.room_name

        # saving room name to chatid model
        try:
            ChatIDS.objects.create(chatid=self.room_group_name)
        except IntegrityError:
            pass
        
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

        data = Messages.objects.all().values('id', 'message', 'pic', 'is_pic', 
                                            'sender', 'receiver', 'date_created',
                                            'opened')
        serialized_q = json.dumps(list(data), cls=DjangoJSONEncoder)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat_message", "message": serialized_q}
        )
        
    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        async_to_sync( self.save_message(message))
        # Send message to room group
        data = Messages.objects.all().values('id', 'message', 'pic', 'is_pic', 
                                            'sender', 'receiver', 'date_created',
                                            'opened')
        serialized_q = json.dumps(list(data), cls=DjangoJSONEncoder)
        async_to_sync(self.channel_layer.group_send)(
            # self.room_group_name, {"type": "chat_message", "message": message}
            self.room_group_name, {"type": "chat_message", "message": serialized_q}
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message_response": message}))

    # @database_sync_to_async
    def save_message(self, message):
        print(message)
        sender = User.objects.get(id=message["sender"])
        receiver = User.objects.get(id=message["receiver"])
        chatid = ChatIDS.objects.get(chatid=self.room_group_name)

        try:
            Messages.objects.create(
                sender = sender, 
                receiver = receiver,
                pic = None,            
                message=message["message"],
                roomchatID = chatid
            )
        except KeyError:
            pass
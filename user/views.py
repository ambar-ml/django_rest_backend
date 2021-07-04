from django.shortcuts import render
from django.db import IntegrityError
from django.core.exceptions import ValidationError

# Create your views here.
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer,MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import NewUser



class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    

    def post(self, request, format='json'):
        if self.request.data['email']=='':
            return Response({"error":"Email field cannot be empty"})

        if self.request.data['user_name']=='':
            return Response({"error":"Username field cannot be empty"})

        if self.request.data['password']=='':
            return Response({"error":"Password field cannot be empty"})
        
        
        serializer = CustomUserSerializer(data=request.data)
       
        if serializer.is_valid():
            if NewUser.objects.filter(email=self.request.data['email']).exists():
                return Response({"error": "This email id already exists."})
            if NewUser.objects.filter(user_name=self.request.data['user_name']).exists():
                return Response({"error": "This username already exists."})
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
       
      



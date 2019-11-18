#pylint: disable = no-member, arguments-differ

# from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, UpdateAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_422_UNPROCESSABLE_ENTITY
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer, NestedUserSerializer
# from invoices.serializers import NestedUserSerializer
from datetime import datetime, timedelta

User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration Successful'})
        return Response(serializer.errors, status=422)

class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message' : 'Invalid Credentials1'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)

        if not user.check_password(password):
            raise PermissionDenied({'message':'Invalid Credentials2'})

        # token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        dt = datetime.now() + timedelta(days=1)
        token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, 
        settings.SECRET_KEY, algorithm='HS256')
        return Response({'token':token, 'message':f'Welcome back {user.username}'})

# class ProfileUpdate(UpdateAPIView):
#     queryset = User
#     serializer_class = NestedUserSerializer


# class ProfileView(RetrieveDestroyAPIView):
#     queryset = User
#     serializer_class = UserSerializer


# class ProfileView(RetrieveUpdateDestroyAPIView):
#     queryset = User
#     serializer_class = UserSerializer

class DashboardView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        user = User.objects.get(pk=request.user.id) # we get this request.user.id because it is a protected route, the information comes from the token used
        serialized_user = UserSerializer(user) # serialize the found user into JSON ready to send back
        return Response(serialized_user.data) # then actually sending it back in the response

    
    def put(self, request):
        user = User.objects.get(pk=request.user.id) # find the user by the token
        updated_user = NestedUserSerializer(user, data=request.data)
        if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data)
        return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request):
        user = User.objects.get(pk=request.user.id) # find the user by the token
        user.delete() # delete them
        return Response(status=HTTP_204_NO_CONTENT)

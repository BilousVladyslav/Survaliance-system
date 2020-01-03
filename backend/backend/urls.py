from django.contrib import admin
from django.urls import path
from .apps.authentication.views import *
from .apps.frames_receiver.views import *
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', HelloView.as_view(), name='hello'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('users/', UserRegistrationAPIView.as_view(), name="list"),
    path('users/login/', UserLoginAPIView.as_view(), name="login"),
    path('drones', FrameAPIView.as_view())
]

from django.contrib import admin
from django.urls import path
from backend.apps.authentication import views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('users/', views.UserRegistrationAPIView.as_view(), name="list"),
    path('users/login/', views.UserLoginAPIView.as_view(), name="login"),

]

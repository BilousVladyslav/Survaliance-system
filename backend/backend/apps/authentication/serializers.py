from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.RegexField(regex=r'^(?=.*\d).{6,10}$', write_only=True)

    def create(self, validated_data):

        user = UserModel.objects.create(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ("id", "username", "password", )

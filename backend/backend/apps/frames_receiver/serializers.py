from .models import Drone
from datetime import datetime

from rest_framework import serializers


class DroneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Drone
        fields = ("name", "photo")

    def validate(self, attrs):
        if attrs.get('name') is None:
            raise serializers.ValidationError("Can`t get drone name.")
        if attrs.get('photo') is None:
            raise serializers.ValidationError("Can`t get photo from drone.")
        dt = datetime.now()
        attrs['photo_created'] = dt.isoformat()
        return attrs

from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Drone
from rest_framework.generics import CreateAPIView
from .serializers import DroneSerializer

drones = Drone.objects


class FrameAPIView(CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = DroneSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        try:
            drone = drones.get(name=request.data.get("name"))
            serializer = self.get_serializer(drone, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, *args, **kwargs):
        if name := request.query_params.get("name"):
            try:
                drone = drones.get(name=name)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                content = {'name': name,
                           'image': drone.image_to_64base(),
                           'photo_created' : drone.photo_created
                }
                return Response(data=content, status=status.HTTP_200_OK)
        return Response(data='ok', status=status.HTTP_200_OK)


class DronesView(APIView):
    permission_classes = ()

    def get(self, request, *args, **kwargs):
        content = {'names' : [drone.name for drone in drones.all()]}
        return Response(data=content, status=status.HTTP_200_OK)

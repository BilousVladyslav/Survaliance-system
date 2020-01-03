from django.db import models


class Drone(models.Model):
    name = models.CharField(max_length=255, unique=True)
    photo = models.ImageField(upload_to='images')
    photo_created = models.DateTimeField()

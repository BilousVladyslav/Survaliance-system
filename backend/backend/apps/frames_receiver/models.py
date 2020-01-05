from django.db import models
from django.core.files import File
from base64 import b64encode


class Drone(models.Model):
    name = models.CharField(max_length=255, unique=True)
    photo = models.ImageField(upload_to='images')
    photo_created = models.DateTimeField()

    def save(self, *args, **kwargs):
        if self.pk is not None:
            old_self = Drone.objects.get(pk=self.pk)
            if old_self.photo and self.photo != old_self.photo:
                old_self.photo.delete(False)
        return super(Drone, self).save(*args, **kwargs)

    def image_to_64base(self):
        file = open(self.photo.path, 'rb')
        raw_image = File(file).read()
        file.close()
        return b64encode(raw_image)

from django.db import models

# Create your models here.


class DataMy(models.Model):
    name = models.CharField(default='admin',max_length=16)
    score = models.IntegerField()

    def __str__(self):
        return self.name

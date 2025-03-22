from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class User(AbstractUser):
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    email=models.EmailField(max_length=255,unique=True)
    password=models.CharField(max_length=255)
    username = models.CharField(max_length=255, null=True, blank=True)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]


    def __str__(self):
        return self.email


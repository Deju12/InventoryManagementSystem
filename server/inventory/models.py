from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        extra_fields.setdefault("is_active", True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        # Explicitly remove the requirement for username
        extra_fields.pop("username", None)

        return self.create_user(email=email, password=password, **extra_fields)

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('store_keeper', 'Store Keeper'),
        ('user', 'User'),
    ]

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=255, choices=ROLE_CHOICES, default='user')  # Add choices here
    is_active = models.BooleanField(default=True)
    username = None 

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  

    objects = UserManager()  # Use the custom manager

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.get_role_display()})"  # Display role name

class Store(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    Store_keeper = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stores')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    store=models.ForeignKey(Store, on_delete=models.CASCADE, related_name='products')
    expire_date= models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Supplier(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.CharField()
    address = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


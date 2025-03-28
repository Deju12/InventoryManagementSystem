from django.contrib import admin
from .models import Product, Supplier,Store, User


admin.site.register(User)
admin.site.register(Store)
admin.site.register(Product)
admin.site.register(Supplier)
# Generated by Django 5.1.5 on 2025-03-28 05:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0007_supplier_store_storekeeper_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='store_keeper',
        ),
        migrations.DeleteModel(
            name='StoreKeeper',
        ),
    ]

# Generated by Django 5.1.5 on 2025-03-28 06:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0009_user_username'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Product',
        ),
        migrations.RemoveField(
            model_name='store',
            name='store_keeper',
        ),
        migrations.DeleteModel(
            name='Supplier',
        ),
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
        migrations.DeleteModel(
            name='Store',
        ),
    ]

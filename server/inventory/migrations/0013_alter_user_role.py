# Generated by Django 5.1.5 on 2025-03-28 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0012_user_role_alter_supplier_address_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('admin', 'Admin'), ('store_keeper', 'Store Keeper'), ('user', 'User')], default='user', max_length=255),
        ),
    ]

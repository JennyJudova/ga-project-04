# Generated by Django 2.2.7 on 2019-11-14 13:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_user_invoices'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='invoices',
        ),
    ]

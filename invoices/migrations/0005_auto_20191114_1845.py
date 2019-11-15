# Generated by Django 2.2.7 on 2019-11-14 18:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0004_invoice_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invoices', to=settings.AUTH_USER_MODEL),
        ),
    ]

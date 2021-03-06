# Generated by Django 2.2.7 on 2019-11-14 13:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('invoices', '0003_remove_invoice_creator'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='creator',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.DO_NOTHING, related_name='invoices', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]

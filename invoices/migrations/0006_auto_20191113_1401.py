# Generated by Django 2.2.7 on 2019-11-13 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0005_auto_20191113_1221'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoice',
            name='invoice_items',
        ),
        migrations.AddField(
            model_name='invoice',
            name='invoice_items',
            field=models.ManyToManyField(blank=True, related_name='invoice', to='invoices.Invoice_Item'),
        ),
    ]
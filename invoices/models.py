from datetime import date
from djmoney.models.fields import MoneyField
from django.db import models

class Client(models.Model):
    full_name = models.CharField(max_length=50, blank=True)
    company_name = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=50)


class Invoice_Item(models.Model):
    item_description = models.CharField(max_length=200, unique=True)
    quantity_hrs = models.FloatField(null=True, default=0)
    unit_price_hrs = models.FloatField(null=True, default=0)
    total = MoneyField(max_digits=10, decimal_places=2, null=True, default_currency='GBP')

    def __str__(self):
        return f'{self.item_description}'

class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50, unique=True)
    issue_date = models.DateField(default=date.today)
    due_date = models.DateField(null=True)
    vat_registered = models.BooleanField(default=False)
    subtotal = MoneyField(max_digits=10, decimal_places=2, null=True, default_currency='GBP')
    vat = models.FloatField(null=True, default=0)
    total = MoneyField(max_digits=10, decimal_places=2, default_currency='GBP')
    notes = models.CharField(max_length=500, blank=True)
    terms = models.CharField(max_length=500, blank=True)
    is_paid = models.BooleanField(default=False)
    currency = models.CharField(max_length=50, default='GBP')
    invoice_items = models.ForeignKey(
        Invoice_Item,
        related_name='invoice',
        on_delete=models.DO_NOTHING,
        null=True
    )
    client = models.ForeignKey(
        Client,
        related_name='invoice',
        on_delete=models.DO_NOTHING,
        null=True
    )

    def __str__(self):
        return f'{self.invoice_number}'




# class Line(models.Model):
#     name = models.CharField(max_length=50)

#     def __str__(self):
#         return f'{self.name}'

# # The thing you are referencing should be created first so Station references Zone so Zone sits above Station
# class Zone(models.Model):
#     zone = models.IntegerField()

#     def __str__(self):
#         return f'{self.zone}'

# # Create your models here.
# class Station(models.Model):
#     name = models.CharField(max_length=50, unique=True)
#     lat = models.FloatField()
#     lon = models.FloatField()
#     is_night_tube = models.BooleanField(default=False)
#     zone = models.ForeignKey(
#         Zone,
#         related_name='stations',
#         on_delete=models.DO_NOTHING,
#         null=True
#     )#prepares the flip relationship so that they can refencence each other.
#     lines = models.ManyToManyField(
#         Line,
#         related_name='stations',
#         blank=True
#     )

#     def __str__(self):
#         return f'{self.name}'

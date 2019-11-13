from datetime import date
from djmoney.models.fields import MoneyField
from django.db import models

class Client(models.Model):
    full_name = models.CharField(max_length=50, blank=True)
    company_name = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.email}'

class Invoice_Item(models.Model):
    item_description = models.CharField(max_length=200)
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
    invoice_items = models.ManyToManyField(
        Invoice_Item,
        related_name='invoice',
        blank=True
    )
    client = models.ForeignKey(
        Client,
        related_name='invoices',
        on_delete=models.DO_NOTHING,
        null=True
    )

    def __str__(self):
        return f'{self.invoice_number}'

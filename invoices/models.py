from datetime import date
from django.db import models

class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50, unique=True, )
    issue_date = models.DateField(default=date.today)
    due_date = models.DateField(null=True)
    vat_registered = models.BooleanField(default=False)
    subtotal = models.FloatField(null=True)
    vat = models.FloatField(null=True)
    total = models.FloatField()
    notes = models.CharField(max_length=500, blank=True)
    terms = models.CharField(max_length=500, blank=True)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.invoice_number}'

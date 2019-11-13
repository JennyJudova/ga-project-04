from rest_framework import serializers
from .models import Invoice

class InvoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invoice
        fields = ('id', 'invoice_number', 'issue_date', 'due_date', 'vat_registered', 'subtotal', 'vat', 'total', 'notes', 'terms', 'is_paid', 'currency')

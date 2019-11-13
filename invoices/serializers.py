from rest_framework import serializers
from .models import Invoice, Invoice_Item, Client

class NestedInvoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invoice
        fields = ('id', 'invoice_number', 'issue_date', 'due_date', 'vat_registered', 'subtotal', 'vat', 'total', 'notes', 'terms', 'is_paid', 'currency')


class NestedClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ('id', 'full_name', 'company_name', 'address', 'email')


class NestedInvoice_ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invoice_Item
        fields = ('id', 'item_description', 'quantity_hrs', 'unit_price_hrs', 'total')



class ClientSerializer(serializers.ModelSerializer):

    invoices = NestedInvoiceSerializer(many=True)

    class Meta:
        model = Client
        fields = ('id', 'full_name', 'company_name', 'address', 'email', 'invoices')


class Invoice_ItemSerializer(serializers.ModelSerializer):

    invoice = NestedInvoiceSerializer(many=True)

    class Meta:
        model = Invoice_Item
        fields = ('id', 'item_description', 'quantity_hrs', 'unit_price_hrs', 'total', 'invoice')


class InvoiceSerializer(serializers.ModelSerializer):

    invoice_items = NestedInvoice_ItemSerializer(many=True)
    client = NestedClientSerializer()

    class Meta:
        model = Invoice
        fields = ('id', 'invoice_number', 'issue_date', 'due_date', 'vat_registered', 'subtotal', 'vat', 'total', 'notes', 'terms', 'is_paid', 'currency', 'invoice_items', 'client')

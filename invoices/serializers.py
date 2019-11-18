#pylint: disable=no-member

from rest_framework import serializers
from .models import Invoice, Invoice_Item, Client
# from jwt_auth.serializers import NestedUserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class NestedClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ('id', 'full_name', 'company_name', 'address', 'email')


class NestedInvoice_ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invoice_Item
        fields = ('id', 'item_description', 'quantity_hrs', 'unit_price_hrs', 'total')


class NestedInvoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invoice
        fields = ('id', 'invoice_number', 'issue_date', 'due_date', 'vat_registered', 'subtotal', 'vat', 'total', 'notes', 'terms', 'is_paid', 'currency', 'invoice_items')


class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        invoices = NestedInvoiceSerializer(many=True, read_only=True)
        fields = ('id', 'username', 'email', 'logo_image', 'tax_reg', 'address', 'phone_num', 'company_name', 'invoices')



class ClientSerializer(serializers.ModelSerializer):

    invoices = NestedInvoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = ('id', 'full_name', 'company_name', 'address', 'email', 'invoices')


class Invoice_ItemSerializer(serializers.ModelSerializer):

    invoice = NestedInvoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Invoice_Item
        fields = ('id', 'item_description', 'quantity_hrs', 'unit_price_hrs', 'total', 'invoice')


class InvoiceSerializer(serializers.ModelSerializer):

    invoice_items = NestedInvoice_ItemSerializer(many=True)
    client = NestedClientSerializer()
    creator = NestedUserSerializer(read_only=True)

    def create(self, data):
        invoice_items_data = data.pop('invoice_items')
        client_data = data.pop('client')
        #creator_data = data.pop('creator')

        invoice = Invoice(**data)
        invoice.client = Client.objects.get(**client_data)
        #invoice.creator = User.objects.get(**creator_data)
        invoice_items = [Invoice_Item.objects.get(**invoice_item_data) for invoice_item_data in invoice_items_data]

        invoice.save()
        invoice.invoice_items.set(invoice_items)
        return invoice

    def update(self, invoice, data):
        invoice_items_data = data.pop('invoice_items')
        client_data = data.pop('client')

        invoice.invoice_number = data.get('invoice_number', invoice.invoice_number)
        invoice.issue_date = data.get('issue_date', invoice.issue_date)
        invoice.due_date = data.get('due_date', invoice.due_date)
        invoice.vat_registered = data.get('vat_registered', invoice.vat_registered)
        invoice.subtotal = data.get('subtotal', invoice.subtotal)
        invoice.vat = data.get('vat', invoice.vat)
        invoice.total = data.get('total', invoice.total)
        invoice.notes = data.get('notes', invoice.notes)
        invoice.terms = data.get('terms', invoice.terms)
        invoice.is_paid = data.get('is_paid', invoice.is_paid)
        invoice.currency = data.get('currency', invoice.currency)

        invoice.client = Client.objects. get(**client_data)
        invoice_items = [Invoice_Item.objects.get(**invoice_item_data) for invoice_item_data in invoice_items_data]

        invoice.save()
        invoice.invoice_items.set(invoice_items)
        return invoice

    class Meta:
        model = Invoice
        fields = ('id', 'invoice_number', 'issue_date', 'due_date', 'vat_registered', 'subtotal', 'vat', 'total', 'notes', 'terms', 'is_paid', 'currency', 'invoice_items', 'client', 'creator')
        #extra_kwargs = {'creator': {'required': False}} # DOES NOT WORK

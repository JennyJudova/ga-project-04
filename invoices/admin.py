from django.contrib import admin
from .models import Invoice, Client, Invoice_Item

admin.site.register(Invoice)
admin.site.register(Client)
admin.site.register(Invoice_Item)

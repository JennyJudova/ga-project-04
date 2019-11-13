from django.urls import path
from .views import InvoiceListView, InvoiceDetailView, Invoice_ItemListView, Invoice_ItemDetailView, ClientListView, ClientDetailView

urlpatterns = [
    path('invoices', InvoiceListView.as_view()),
    path('invoices/<int:pk>/', InvoiceDetailView.as_view()),
    path('invoice-items', Invoice_ItemListView.as_view()),
    path('invoice-items/<int:pk>/', Invoice_ItemDetailView.as_view()),
    path('clients', ClientListView.as_view()),
    path('clients/<int:pk>/', ClientDetailView.as_view()),
]

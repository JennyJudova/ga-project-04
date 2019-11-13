#pylint: disable=no-member

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
#from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Invoice, Invoice_Item, Client
from .serializers import InvoiceSerializer, Invoice_ItemSerializer, ClientSerializer

class InvoiceListView(ListCreateAPIView):
    #permission_classes = (IsAuthenticatedOrReadOnly, ) #trailing comma because this is a tuple
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class InvoiceDetailView(RetrieveUpdateDestroyAPIView):
    #permission_classes = (IsAuthenticatedOrReadOnly, ) #trailing comma because this is a tuple
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


class Invoice_ItemListView(ListCreateAPIView):
    #permission_classes = (IsAuthenticatedOrReadOnly, ) #trailing comma because this is a tuple
    queryset = Invoice_Item.objects.all()
    serializer_class = Invoice_ItemSerializer

class Invoice_ItemDetailView(RetrieveUpdateDestroyAPIView):
    #permission_classes = (IsAuthenticatedOrReadOnly, ) #trailing comma because this is a tuple
    queryset = Invoice_Item.objects.all()
    serializer_class = Invoice_ItemSerializer

class ClientListView(ListCreateAPIView):
    #permission_classes = (IsAuthenticatedOrReadOnly, ) #trailing comma because this is a tuple
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientDetailView(RetrieveUpdateDestroyAPIView):
    #permission_classes = (IsAuthenticatedOrReadOnly, ) #trailing comma because this is a tuple
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

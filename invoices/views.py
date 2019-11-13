#pylint: disable=no-member

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
#from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Invoice
from .serializers import InvoiceSerializer

class InvoiceListView(ListCreateAPIView):
    #permission_classes = (IsAuthenticatedOrReadOnly, ) #trailing comma because this is a tuple
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class InvoiceDetailView(RetrieveUpdateDestroyAPIView):
    #permission_classes = (IsAuthenticatedOrReadOnly, ) #trailing comma because this is a tuple
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

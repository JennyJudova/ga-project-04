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

    # # Note - don't get confused here by the fact the method is called post and we are creating posts. The method name refers to HTTP verd POST, which is what we use to send a create request, our other post, is because tht is the name of the post resource of our blog app
    # def post(self, request): # method to handle POST requests to create a new post.
    #     request.data['owner'] = request.user.id # attach the owner id to the post, we get this from the authentication class, our user it attached as request.user
    #     post = PostSerializer(data=request.data) # we pass the data we have been send with the request(the json body of the POST request to '/posts', which should contain a valid object with all the correct fields)
    #     if post.is_valid(): # we can then use this in built is valid function, to see if your request data was right, and included everything it needed to
    #         post.save() # If is valid comes back as true, we save the post. This creates it in the database
    #         return Response(post.data, status=HTTP_201_CREATED) # we then send back the newly created post in the response to client, the data object of the post is the JSON data
    #     return Response(post.errors, status=HTTP_422_UNPROCESSABLE_ENTITY) # if the post is not valid, we send the post with its errors object, this contains information about what fields would of been missing/have mistakes in them alone with a 422 sttus code


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

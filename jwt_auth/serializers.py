#pylint: disable = no-member, arguments-differ

from rest_framework import serializers
from django.contrib.auth import get_user_model
#import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from invoices.serializers import InvoiceSerializer

User = get_user_model()

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'logo_image', 'tax_reg', 'address', 'phone_num', 'company_name')

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    invoices = InvoiceSerializer(many=True, read_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'does not match'})

        # #password validation happens here
        # try:
        #     validations.validate_password(password=password)
        # except ValidationError as err:
        #     raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password_confirmation', 'logo_image', 'tax_reg', 'address', 'phone_num', 'company_name', 'invoices')

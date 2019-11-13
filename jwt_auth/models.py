from phonenumber_field.modelfields import PhoneNumberField
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    logo_image = models.CharField(max_length=500, blank=True)
    tax_reg = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=100, blank=True)
    phone_num = PhoneNumberField(blank=True)
    company_name = models.CharField(max_length=50, blank=True)

from rest_framework import serializers
from .models import Prod,Contact



class ProdSerializer(serializers.ModelSerializer):
    class Meta:
        model=Prod
        fields=['id','prod_name','desc','category','sub_category','price','image']
        read_only_fields=['id','prod_name','desc','category','sub_category','price','image']



class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Contact
        fields=['first_name','last_name','email','country','question']    





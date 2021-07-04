from django.db import models

# Create your models here.
class Prod(models.Model):
    
    prod_name=models.CharField(max_length=50)
    desc=models.CharField(max_length=200,default='')
    category=models.CharField(max_length=50,default='')
    sub_category=models.CharField(max_length=50,default='')
    price=models.IntegerField(default=0)
    image=models.ImageField(upload_to='ecom/prod_images',default='')
    
class Contact(models.Model):
    first_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30)
    email=models.EmailField()
    country=models.CharField(max_length=30)
    question=models.CharField(max_length=500)


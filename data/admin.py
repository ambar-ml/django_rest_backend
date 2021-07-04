from django.contrib import admin
from .models import Prod,Contact

# Register your models here.
@admin.register(Prod)
class ProdAdmin(admin.ModelAdmin):
    list_display=['id','prod_name','desc','category','sub_category','price','image']

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display=['id','first_name','last_name','email','country','question']

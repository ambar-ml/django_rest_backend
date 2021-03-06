from django.shortcuts import render
from .models import Prod,Contact
from .serializers import ProdSerializer,ContactUsSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
import os
from django.views import View





from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework import exceptions
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes




# Create your views here.

class ProdReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=Prod.objects.all()
    serializer_class= ProdSerializer

class ContactUsModelViewSet(viewsets.ViewSet):
    def create(self,request):
        serializer=ContactUsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Submission Successful'})
        return Response(serializer.errors)

class SearchProd(ListAPIView):
    queryset=Prod.objects.all()
    serializer_class=ProdSerializer
    filter_backends=[SearchFilter]
    search_fields=['category','sub_category']


class CatProd(ListAPIView):
    queryset=Prod.objects.all()
    serializer_class=ProdSerializer
    filter_backends=[DjangoFilterBackend]
    filterset_fields=['category','sub_category']


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()

    
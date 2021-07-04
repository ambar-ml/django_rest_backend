"""ecom URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from data import views as viewsd
from rest_framework_simplejwt.views import (

    TokenRefreshView,
)
from user import views

router=DefaultRouter()
router.register('prodapi',viewsd. ProdReadOnlyModelViewSet,basename='prod')
router.register('contactusapi',viewsd.ContactUsModelViewSet,basename='contact')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls)),
    path('search/',viewsd.SearchProd.as_view()),
    path('category/',viewsd.CatProd.as_view()),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup',views.CustomUserCreate.as_view(),name="create_user"),
    path('logout/blacklist',views.BlacklistTokenUpdateView.as_view(),name="blacklist")
] + static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)

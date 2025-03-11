from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet,ExpenseViewSet
from . import views

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
    path('', include(router.urls)),

]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet,ExpenseViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
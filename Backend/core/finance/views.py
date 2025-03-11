
from .models import Expense
from .models import Category
from .serializers import ExpenseSerializer, CategorySerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from datetime import datetime

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        # Überprüfen, ob der "month"-Parameter im URL-Query-String vorhanden ist
        month = self.request.query_params.get('month', None)

        if month:
            try:
                # Den Monat in eine Zahl umwandeln
                month = int(month)
                # Filtern nach dem Monat
                queryset = queryset.filter(date__month=month)
            except ValueError:
                # Falls der Monat ungültig ist
                queryset = queryset.none()

        return queryset
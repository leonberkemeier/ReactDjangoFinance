# expenses/models.py

from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='expenses', on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"{self.amount} - {self.category.name} - {self.date}"

from django.db import models
from api.models import Student

class Bill(models.Model):
    bill_id = models.BigAutoField(primary_key=True)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE, db_column='student_id')
    debt = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    class Meta:
        db_table = 'bills'
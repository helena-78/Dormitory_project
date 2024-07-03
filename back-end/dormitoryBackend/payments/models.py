from django.db import models
from api.models import Student

class Payment(models.Model):
    payment_id = models.BigAutoField(primary_key=True)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE, db_column='student_id')
    receipt = models.BinaryField()
    date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'payments'
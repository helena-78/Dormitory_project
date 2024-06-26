from django.db import models

class Bill(models.Model):
    bill_id = models.BigAutoField(primary_key=True)
    student_id = models.BigIntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    class Meta:
        db_table = 'bills'
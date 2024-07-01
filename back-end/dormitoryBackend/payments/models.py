from django.db import models

class Payment(models.Model):
    payment_id = models.BigAutoField(primary_key=True)
    student_id = models.BigIntegerField()
    receipt = models.BinaryField()
    date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'payments'
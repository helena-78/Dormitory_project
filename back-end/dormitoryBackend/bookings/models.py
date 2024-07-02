from django.db import models


class Booking(models.Model):
    booking_id = models.BigAutoField(primary_key=True, verbose_name='Booking ID')
    student_id = models.BigIntegerField(blank=True, null=True, verbose_name='Student ID')
    room_id = models.BigIntegerField(blank=True, null=True, verbose_name='Room ID')
    booking_date = models.DateTimeField(auto_now_add=True, verbose_name='Booking Date')
    CONFIRMATION_STATUS_CHOICES = (
        ('Confirmed', 'Confirmed'),
        ('Pending', 'Pending'),
        ('Cancelled', 'Cancelled'),
    )
    confirmation_status = models.CharField(max_length=10, choices=CONFIRMATION_STATUS_CHOICES, default='Pending',
                                           verbose_name='Confirmation Status')

    class Meta:
        verbose_name = 'Booking'
        verbose_name_plural = 'Bookings'
        db_table = 'bookings'

    def __str__(self):
        return f'Booking #{self.booking_id}'

# Create your models here.

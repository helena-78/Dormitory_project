from django.db import models
from api.models import Student, Room

class Booking(models.Model):
    booking_id = models.BigAutoField(primary_key=True, verbose_name='Booking ID')
    room = models.ForeignKey(Room, related_name='bookings_bookings', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='bookings_bookings', on_delete=models.CASCADE)
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

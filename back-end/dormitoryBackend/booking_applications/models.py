# booking/models.py

from django.db import models

class Booking(models.Model):
    CONFIRMATION_STATUS_CHOICES = [
        ('Confirmed', 'Confirmed'),
        ('Pending', 'Pending'),
        ('Cancelled', 'Cancelled'),
    ]

    booking_id = models.BigAutoField(primary_key=True)
    student_id = models.BigIntegerField(null=True, blank=True)
    room_id = models.BigIntegerField(null=True, blank=True)
    booking_date = models.DateTimeField(auto_now_add=True)
    confirmation_status = models.CharField(max_length=10, choices=CONFIRMATION_STATUS_CHOICES)

    class Meta:
        db_table = 'bookings'

    def __str__(self):
        return f'Booking {self.booking_id}'

class Application(models.Model):
    STATUS_CHOICES = [
        ('Submitted', 'Submitted'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    application_id = models.BigAutoField(primary_key=True)
    student_id = models.BigIntegerField()
    room_id = models.BigIntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    application_date = models.DateTimeField(auto_now_add=True)
    desired_roommates = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'applications'

    def __str__(self):
        return f'Application {self.application_id}'

class Invitation(models.Model):
    STATUS_CHOICES = [
        ('Sent', 'Sent'),
        ('Accepted', 'Accepted'),
        ('Declined', 'Declined'),
        ('Expired', 'Expired'),
    ]

    invitation_id = models.BigIntegerField(primary_key=True)
    application_id = models.BigIntegerField()
    sent_date = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    class Meta:
        db_table = 'invitations'

    def __str__(self):
        return f'Invitation {self.invitation_id}'

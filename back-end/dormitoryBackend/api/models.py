from django.db import models
from django.utils import timezone
from status_check.models import Application

class Student(models.Model):
    student_id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    surname = models.TextField()
    email = models.EmailField(unique=True,max_length=255)
    contact_number = models.CharField(max_length=10, null=True, blank=True)   
    gender = models.TextField(choices=[('Male', 'Male'), ('Female', 'Female')])
    room = models.ForeignKey('Room', null=True, blank=True, on_delete=models.SET_NULL)
    application = models.ForeignKey(Application, null=True, blank=True, on_delete=models.SET_NULL, related_name='students')
    password = models.TextField()

class Room(models.Model):
    room_id = models.BigAutoField(primary_key=True)
    number = models.BigIntegerField(unique=True)
    floor = models.BigIntegerField(default=1)
    available_places = models.BigIntegerField()
    images = models.BinaryField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    gender = models.TextField(choices=[('Male', 'Male'), ('Female', 'Female')])

class Booking(models.Model):
    booking_id = models.BigAutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    confirmation_status = models.TextField(choices=[('Confirmed', 'Confirmed'), ('Pending', 'Pending'), ('Cancelled', 'Cancelled')])
    desired_roommates = models.ForeignKey(Student, related_name='desired_roommate', null=True, blank=True, on_delete=models.SET_NULL)

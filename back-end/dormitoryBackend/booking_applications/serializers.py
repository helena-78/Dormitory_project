# booking/serializers.py

from rest_framework import serializers
from .models import Booking, Application, Invitation

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['booking_id', 'student_id', 'room_id', 'booking_date', 'confirmation_status']

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['application_id', 'student_id', 'room_id', 'status', 'application_date', 'desired_roommates']

class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ['invitation_id', 'application_id', 'sent_date', 'expiry_date', 'status']

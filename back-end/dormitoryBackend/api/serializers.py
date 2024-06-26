from rest_framework import serializers
from .models import Student, Room, Application, Booking
import re

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def validate_contact_number(self, value):
        # Check if contact number is a valid 10-digit number
        if not re.fullmatch(r'\d{10}', str(value)):
            raise serializers.ValidationError("Contact number must be a valid 10-digit number.")
        return value
    
    def validate_password(self, value):
        # Check password complexity: at least 8 characters, contains letters and numbers
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.search(r'[A-Za-z]', value):
            raise serializers.ValidationError("Password must contain at least one letter.")
        return value
    
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
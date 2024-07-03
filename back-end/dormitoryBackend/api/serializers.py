from rest_framework import serializers
from .models import Student, Room, Application, Booking
import re
import base64

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
    images = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = '__all__'

    def validate_number(self, value):
        if Room.objects.filter(number=value).exists():
            raise serializers.ValidationError("Room with this number already exists.")
        return value
<<<<<<< HEAD
    
    def get_images(self, obj):
        return base64.b64encode(obj.images).decode('utf-8') if obj.images else None
   
    def create(self, validated_data): 
        image_data = self.initial_data.get('images')
        if image_data:
            image_data = base64.b64decode(image_data.split(',')[1])  # Remove the prefix
        validated_data['images'] = image_data
        return super().create(validated_data)

    def update(self, instance, validated_data):
        image_data = self.initial_data.get('images')
        if image_data:
            image_data = base64.b64decode(image_data.split(',')[1])  # Remove the prefix
        validated_data['images'] = image_data
        return super().update(instance, validated_data)
=======
>>>>>>> origin/Lipko

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
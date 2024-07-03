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
    #serialization - objects are converted to data format like json or binary
   # self allows the method to access other methods and attributes defined within the class.
        #When the serializer serializes a queryset or an instance of Room, each instance is passed as obj to this method.
    # obj.images refers to the images field of this instance.
    #base64.b64encode() accepts binary image data and returns the Base64 format.
    #.decode('utf-8') converts the Base64 back into a UTF-8 string representation of the Base64 data.
#то есть get images - возвращаю UTF-8 string
    def get_images(self, obj):
        return base64.b64encode(obj.images).decode('utf-8') if obj.images else None
   
    def create(self, validated_data): # create a new instance of the Room model
        image_data = self.initial_data.get('images')# retrieve the Base64-encoded image data from the incoming data.
        if image_data:
            image_data = base64.b64decode(image_data) #decodes it in original binary format.
        validated_data['images'] = image_data
        return super().create(validated_data)
    # то есть ввожу Base64-encoded image и отправляю в базу обычный binary format.

    def update(self, instance, validated_data):
        image_data = self.initial_data.get('images')#retrieve the Base64-encoded image data from the incoming data.
        if image_data:
            image_data = base64.b64decode(image_data)
        validated_data['images'] = image_data
        return super().update(instance, validated_data)
    # то есть ввожу Base64-encoded image и отправляю в базу обычный binary format.

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
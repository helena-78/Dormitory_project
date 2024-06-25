from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from .models import Student, Room, Booking, Application
from .serializers import StudentSerializer, BookingSerializer, RoomSerializer, ApplicationSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_student(request, student_id):
    try:
        student = Student.objects.get(pk=student_id)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = StudentSerializer(student)
    return Response(serializer.data, status=status.HTTP_200_OK)  

@api_view(['PATCH'])
def update_student(request, student_id):
    try:
        student = Student.objects.get(pk=student_id)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = StudentSerializer(student, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

@api_view(['POST'])
def create_room(request):
    serializer = RoomSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_room(request, room_id):
    try:
        room = Room.objects.get(pk=room_id)
    except Room.DoesNotExist:
        return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = RoomSerializer(room)
    return Response(serializer.data, status=status.HTTP_200_OK)  

@api_view(['PATCH'])
def update_room(request, room_id):
    try:
        room = Room.objects.get(pk=room_id)
    except Room.DoesNotExist:
        return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = RoomSerializer(room, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

@api_view(['GET'])
def get_rooms_by_floor(request, floor):
    rooms = Room.objects.filter(floor=floor)
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def check_room_availability(request):
    room_id = request.data.get('room_id')
    application_id = request.data.get('application_id')

    if not room_id:
        return Response({'error': 'Room ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not application_id:
        return Response({'error': 'Application ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        room = Room.objects.get(pk=room_id)
    except Room.DoesNotExist:
        return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        application = Application.objects.get(pk=application_id)
    except Application.DoesNotExist:
        return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Calculate the total spots needed
    total_spots_needed = 1  # 1 for the student
    if application.desired_roommate1:
        total_spots_needed += 1
    if application.desired_roommate2:
        total_spots_needed += 1

    if room.available_places >= total_spots_needed:
        return Response({'available': True}, status=status.HTTP_200_OK)
    else:
        return Response({'available': False}, status=status.HTTP_200_OK)
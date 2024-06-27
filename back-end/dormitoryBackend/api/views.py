from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from .models import Student, Room, Booking, Application
from .serializers import StudentSerializer, BookingSerializer, RoomSerializer, ApplicationSerializer

@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_student(request):
    student_id=request.GET.get("student_id")

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
def get_all_rooms(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_room_by_id(request, room_id):
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
def get_rooms_by_floor(request):
    floorvar=request.GET.get("floor")
    rooms = Room.objects.filter(floor=floorvar)
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST']) #переделать в гет
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
        application.save()
        return Response({'room is available': True},room.available_places, status=status.HTTP_200_OK)
    else:
        return Response({'room is available': False}, status=status.HTTP_200_OK)

# задачи Александра Гуся
@api_view(['POST'])
def create_application(request, student_id):
    try:
        student = Student.objects.get(pk=student_id)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if student.applications.exists():
        return Response({'error': 'Student has already submitted an application'}, status=status.HTTP_400_BAD_REQUEST)
    
    request.data['student'] = student_id
    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_application(request, student_id):
    try:
        student = Student.objects.get(pk=student_id)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    application = student.applications.first()
    if not application:
        return Response({'error': 'No application found for this student'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ApplicationSerializer(application)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
def update_application_status(request, student_id):
    try:
        student = Student.objects.get(pk=student_id)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    application = student.applications.first()
    if not application:
        return Response({'error': 'No application found for this student'}, status=status.HTTP_404_NOT_FOUND)

    if 'status' not in request.data:
        return Response({'error': 'Status field is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    application.status = request.data['status']
    application.save()
    
    serializer = ApplicationSerializer(application)
    return Response(serializer.data, status=status.HTTP_200_OK)


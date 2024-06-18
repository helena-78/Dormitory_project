from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from .models import Student, Room, Application, Booking
from .serializers import StudentSerializer, ApplicationSerializer, BookingSerializer, RoomSerializer

class CreateStudent(generics.ListCreateAPIView):
    queryset=Student.objects.all()
    serializer_class=StudentSerializer

class CreateRoom(generics.ListCreateAPIView):
    queryset=Room.objects.all()
    serializer_class=RoomSerializer

class CreateApplication(generics.ListCreateAPIView):
    queryset=Application.objects.all()
    serializer_class=ApplicationSerializer

class StudentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset=Student.objects.all()
    serializer_class=StudentSerializer
    lookup_field="pk"

class RoomRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset=Room.objects.all()
    serializer_class=RoomSerializer
    lookup_field="pk"

@api_view(['GET'])
def check_room_availability(request, room_id):
    try:
        room = Room.objects.get(pk=room_id)
    except Room.DoesNotExist:
        return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

    if room.available_places > 0:
        return Response({'available': True, 'available_places': room.available_places}, status=status.HTTP_200_OK)
    else:
        return Response({'available': False, 'available_places': room.available_places}, status=status.HTTP_200_OK)

# @api_view(['POST'])
# def create_application(request):
#     data = request.data
#     serializer = ApplicationSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def check_room_availability(request, application_id):
#     try:
#         application = Application.objects.get(application_id=application_id)
#     except Application.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     desired_roommates = application.desired_roommates.split(',')
#     students = Student.objects.filter(name__in=desired_roommates)

#     if not students:
#         return Response({'detail': 'No matching students found'}, status=status.HTTP_404_NOT_FOUND)

#     room_count = Room.objects.filter(available_places__gte=len(students) + 1).count()

#     if room_count > 0:
#         room = Room.objects.filter(available_places__gte=len(students) + 1).first()
#         for student in students:
#             Booking.objects.create(student=student, room=room, confirmation_status='Pending')
#         Booking.objects.create(student=application.student, room=room, confirmation_status='Pending')
#         return Response({'room_id': room.room_id}, status=status.HTTP_200_OK)
#     else:
#         return Response({'detail': 'No available rooms for the specified number of students'}, status=status.HTTP_404_NOT_FOUND)
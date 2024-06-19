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

class CreateBooking(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class StudentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset=Student.objects.all()
    serializer_class=StudentSerializer
    lookup_field="pk"

class RoomRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset=Room.objects.all()
    serializer_class=RoomSerializer
    lookup_field="pk"

class BookingRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    lookup_field = "pk"

class RoomsByFloor(generics.ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        floor = self.kwargs['floor']
        return Room.objects.filter(floor=floor)

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

@api_view(['POST'])
def book_room(request):
    student_id = request.data.get('student_id')
    room_id = request.data.get('room_id')
    desired_roommate_id = request.data.get('desired_roommate_id')

    try:
        student = Student.objects.get(pk=student_id)
        room = Room.objects.get(pk=room_id)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    except Room.DoesNotExist:
        return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

    if room.available_places <= 0:
        return Response({'error': 'No available places in this room'}, status=status.HTTP_400_BAD_REQUEST)

    if not desired_roommate_id:
        desired_roommate = None
    
    try:
        desired_roommate = Student.objects.get(pk=desired_roommate_id)
        if desired_roommate.room and desired_roommate.room != room:
            return Response({'error': 'Desired roommate is in a different room'}, status=status.HTTP_400_BAD_REQUEST)
    except Student.DoesNotExist:
        return Response({'error': 'Desired roommate not found'}, status=status.HTTP_404_NOT_FOUND)
    
    booking = Booking.objects.create(student=student, room=room, confirmation_status='Pending', desired_roommate=desired_roommate)
    room.available_places -= 1
    room.save()

    return Response({'success': 'Room booked successfully', 'booking_id': booking.booking_id}, status=status.HTTP_201_CREATED)

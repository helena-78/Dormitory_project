# booking/views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Booking, Application, Invitation
from .serializers import BookingSerializer, ApplicationSerializer, InvitationSerializer


@api_view(['PATCH'])
def update_booking_status(request, pk):
    try:
        booking = Booking.objects.get(pk=pk)
    except Booking.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = BookingSerializer(booking, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_applications(request):
    applications = Application.objects.all()
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_invitation(request):
    try:
        invitation_id = request.data['invitation_id']
        application_id = request.data['application_id']
        expiry_date = request.data['expiry_date']
    except KeyError:
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    # Проверим, существует ли заявка с указанным ID
    try:
        application = Application.objects.get(pk=application_id)
    except Application.DoesNotExist:
        return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)

    invitation = Invitation(
        invitation_id=invitation_id,
        application_id=application_id,
        expiry_date=expiry_date,
        status='Sent'
    )
    invitation.save()

    serializer = InvitationSerializer(invitation)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

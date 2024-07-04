# booking/urls.py

from django.urls import path
from .views import update_booking_status, list_applications, create_invitation

urlpatterns = [
    path('booking-confirmation/<int:pk>/', update_booking_status, name='update_booking_status'),
    path('applications/', list_applications, name='list_applications'),
    path('invitations/', create_invitation, name='create_invitation'),
]

from django.urls import path
from .views import (
    create_student, get_student, update_student,
    create_room, get_room, update_room, get_rooms_by_floor, check_room_availability,
    register, login_view
)

urlpatterns = [
    path('students/', create_student, name='create_student'),
    path('students/<int:student_id>/', get_student, name='get_student'),
    path('students/<int:student_id>/update/', update_student, name='update_student'),
    path('rooms/', create_room, name='create_room'),
    path('rooms/<int:room_id>/', get_room, name='get_room'),
    path('rooms/<int:room_id>/update/', update_room, name='update_room'),
    path('rooms/floor/<int:floor>/', get_rooms_by_floor, name='get_rooms_by_floor'),
    path('rooms/check_availability/', check_room_availability, name='check_room_availability'),
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
]

from django.urls import path
from . import views

urlpatterns=[
    path("students", views.create_student, name="create-student"),
    path("students/", views.get_all_students, name="get-all-students"),
    path("students/<int:student_id>", views.get_student_by_id, name="get-student-by-id"),    
    path("students/<int:student_id>/", views.update_student, name="update-student"),
    path('students/<int:student_id>//', views.delete_student, name='delete-room'),

    path("rooms", views.create_room, name="create-room"),
    path("rooms/", views.get_all_rooms, name="get-all-rooms"),
    path("rooms/<int:room_id>", views.get_room_by_id, name="get-room-by-id"),    
    path("rooms/floor/", views.get_rooms_by_floor, name="rooms-by-floor"),     
    # path('rooms/check_availability/', views.check_room_availability, name='check_room_availability'),
    path("rooms/<int:room_id>/", views.update_room, name="update-room"),
    path('rooms/<int:room_id>//', views.delete_room, name='delete-room'),
]
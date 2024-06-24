from django.urls import path
from . import views

urlpatterns=[
    path("students/", views.create_student, name="create-student"),
    path("students/<int:student_id>/", views.get_student, name="get-student"),
    path("students/<int:student_id>/update/", views.update_student, name="update-student"),
    path("rooms/", views.create_room, name="create-room"),
    path("rooms/<int:room_id>/", views.get_room, name="get-room"),
    path("rooms/<int:room_id>/update/", views.update_room, name="update-room"),
    # path("students/<int:student_id>/applications", views.create_application, name="create-application"),
    # path("students/<int:student_id>/applications/", views.get_application, name="get-application"),
    # path("students/<int:student_id>/applications/status/", views.update_application_status, name="update-application-status"),
    # path("bookings/", views.CreateBooking.as_view(), name="create-booking"),
    # path("bookings/<int:pk>/", views.BookingRetrieveUpdateDestroy.as_view(), name="booking-update"),
    # path("rooms/<int:room_id>/availability/", views.check_room_availability, name="check-room-availability"),
    # path("rooms/floor/<int:floor>/", views.RoomsByFloor.as_view(), name="rooms-by-floor"), 
    # path("book_room/", views.book_room, name="book-room")
]
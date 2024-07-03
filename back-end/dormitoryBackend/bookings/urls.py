from django.urls import path
from bookings import views
urlpatterns = [
    path('bookings/', views.list_bookings, name='list_bookings'),
    path('bookings/create/', views.create_booking, name='create_booking'),
    path('bookings/<int:pk>/', views.get_booking, name='get_booking'),
    path('bookings/<int:pk>/update/', views.update_booking, name='update_booking'),
    path('bookings/<int:pk>/', views.delete_booking, name='delete_booking')
    ]

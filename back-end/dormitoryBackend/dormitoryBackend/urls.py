from django.urls import path
from status_check.views import create_application,  get_application, update_application_status, ApplicationsAPIView, delete_application
from bookings import views

urlpatterns = [
    path('applications/', ApplicationsAPIView.as_view(), name='applications-list'),
    path('applications/create/', create_application, name='create-application'),
    path('applications/<int:pk>/', get_application, name='get-application'),
    path('applications/<int:pk>/update/', update_application_status, name='update-application-status'),
    path('applications/<int:pk>/', delete_application, name='delete_application'),
    path('bookings/', views.list_bookings, name='list_bookings'),
    path('bookings/create/', views.create_booking, name='create_booking'),
    path('bookings/<int:pk>/', views.get_booking, name='get_booking'),
    path('bookings/<int:pk>/update/', views.update_booking, name='update_booking'),
    path('bookings/<int:pk>/', views.delete_booking, name='delete_booking'),
]



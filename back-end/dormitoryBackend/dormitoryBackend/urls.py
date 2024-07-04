
"""
URL configuration for dormitoryBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from status_check.views import create_application,  get_application, update_application_status, ApplicationsAPIView, delete_application
from bookings import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('bills.urls')),
    path('', include('payments.urls')),
    path('', include("api.urls")),
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



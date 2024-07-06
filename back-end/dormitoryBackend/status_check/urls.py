from django.urls import path
from status_check.views import *


urlpatterns = [
    path('applications/', ApplicationsAPIView.as_view(), name='applications-list'),
    path('applications/create/', create_application, name='create-application'),
    path('applications/<int:pk>/', get_application, name='get-application'),
    path('applications/<int:pk>/update/', update_application_status, name='update-application-status'),
    path('applications/<int:pk>/delete/', delete_application, name='delete_application'),
]

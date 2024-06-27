from django.urls import path
from . import views

urlpatterns = [
    path('bills/', views.BillListView.as_view(), name='get_all_bills'),
    path('bills/<int:id>/', views.BillDetailView.as_view(), name='get_student_bill'),
]
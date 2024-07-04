from django.urls import path
from . import views

urlpatterns = [
    path('payments/', views.get_all_payments, name='get_all_payments'),
    path('payments/<int:id>/', views.get_student_payment, name='get_student_payment'),
    path('payments/student/<int:id>/', views.get_student_payments, name='get_student_payments'),
    path('payments/checkout/', views.checkout, name='view_checkout'),
    path('payments/success/', views.success, name='payment_success'),
    path('payments/cancel/', views.cancel, name='payment_cancel')
]
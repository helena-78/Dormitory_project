from decimal import Decimal
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.urls import reverse
from django.shortcuts import render
from .models import Payment
from .serializers import PaymentSerializer
from dormitoryBackend import settings
from .utils import PDF
from bills.models import Bill
from api.models import Student
import stripe
import io

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['GET'])
def get_all_payments(request):
    try:
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error: {e}")
        return Response({'error': 'An error occurred while retrieving payments'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_student_payments(request, id):
    if not id:
        return Response({"error": "id parameter in url is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    try:    
        payments = Payment.objects.filter(student_id=id)
        serializer = PaymentSerializer(payments, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Payment.DoesNotExist:
        return Response({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f'An unexpected error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_student_payment(request, id):
    if not id:
        return Response({"error": "id parameter in url is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    try:    
        payment = Payment.objects.get(payment_id=id)
        serializer = PaymentSerializer(payment)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Payment.DoesNotExist:
        return Response({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f'An unexpected error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def checkout(request):
    room_number = request.data.get('room_number')
    room_price = request.data.get('room_price')
    student_id = request.data.get('student_id')

    if not room_number or not room_price or not student_id:
        return Response({"error": "missing parameter!"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'uah',
                    'product_data': {
                        'name': f'Кімната №{room_number}',
                    },
                    'unit_amount': room_price * 100,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=request.build_absolute_uri(reverse('payment_success')) + f'?student_id={student_id}&room_number={room_number}&price={room_price}',
            cancel_url=request.build_absolute_uri(reverse('payment_cancel')),
        )
        return Response({'sessionUrl': session.url}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error: {e}")
        return Response({'error': 'An error occurred while creating the checkout session'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def success(request):
    student_id = request.GET.get('student_id')
    room_price = request.GET.get('price')
    room_number = request.GET.get('room_number')

    if not room_number or not room_price or not student_id:
        return Response({"error": "missing parameter!"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        student_id = int(student_id)
        room_price = Decimal(room_price)
        room_number = int(room_number)
        
        bill = Bill.objects.get(student_id=student_id)
        bill.debt -= room_price
        bill.save()
    
        pdf = PDF("./payments/static/maximising-user-satisfaction-1.jpg")
        pdf.add_page()

        pdf.add_room_info(room_number=room_number, room_price=room_price, student_id=student_id)
        pdf_output = io.BytesIO()
        pdf_content = pdf.output(dest='S').encode('latin1')
        pdf_output.write(pdf_content)
        pdf_output.seek(0)
        pdf_data = pdf_output.getvalue()

        student = Student.objects.get(student_id=student_id)

        payment = Payment(student_id=student, receipt=pdf_data)
        payment.save()

        return render(request, 'success_payment.html')
    except Bill.DoesNotExist:
        return Response({'error': 'Bill not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error: {e}")
        return Response({'error': 'An error occurred while processing the payment success'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def cancel(request):
    try:
        return render(request, 'cancel_payment.html')
    except Exception as e:
        print(f"Error: {e}")
        return Response({'error': 'An error occurred while processing the payment cancellation'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
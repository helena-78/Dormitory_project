from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Bill
from .serializers import BillSerializer
from decimal import Decimal

class BillListView(APIView):
    def get(self, request):
        try:
            bills = Bill.objects.all()
            serializer = BillSerializer(bills, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(f"Error: {e}")
            return Response({'error': 'An error occurred while retrieving bills'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request):
        try:
            serializer = BillSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(f"Error: {e}")
            return Response({'error': 'An error occurred while creating a bill'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BillDetailView(APIView):
    def get(self, request, id):
        try:
            bill = Bill.objects.get(bill_id=id)
            serializer = BillSerializer(bill)

            return Response(serializer.data)
        except Bill.DoesNotExist:
            return Response({'error': 'Bill not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error: {e}")
            return Response({'error': 'An error occurred while retrieving the bill'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self, request, id):
        try:
            bill = Bill.objects.get(bill_id=id)
            bill.delete()

            return Response({'message': 'Bill deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Bill.DoesNotExist:
                return Response({'error': 'Bill not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error: {e}")
            return Response({'error': 'An error occurred while deleting the bill'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def updateBills():
    try:
        bills = Bill.objects.all()

        for bill in bills:
            student = bill.student_id
            room = student.room

            bill.debt += Decimal(room.price)
            bill.save()

            print(f"Debt balances updated")
    except Exception as e:
        print(f"Error updating debt balances: {e}")
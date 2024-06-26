from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Bill  # Assuming you have a Bill model
from .serializers import BillSerializer  # Assuming you have a BillSerializer

class BillListView(APIView):
    def get(self, request):
        bills = Bill.objects.all()
        serializer = BillSerializer(bills, many=True)

        return Response(serializer.data)
    
    def post(self, request):
        serializer = BillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BillDetailView(APIView):
    def get(self, request, id):
        bill = get_object_or_404(Bill, bill_id=id)
        serializer = BillSerializer(bill)

        return Response(serializer.data)
    
    def delete(self, request, id):
        bill = get_object_or_404(Bill, bill_id=id)
        bill.delete()

        return Response({'message': 'Bill deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    

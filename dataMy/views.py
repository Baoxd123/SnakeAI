from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from dataMy.models import DataMy
def function(request):
    dataMy=DataMy(name=request.GET.get('name'),score=request.GET.get('score'))
    dataMy.save()
    
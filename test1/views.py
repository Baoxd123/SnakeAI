from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from dataMy.models import DataMy
def function(request):
    # dataMy=DataMy(name=request.GET.get('name'),score=request.GET.get('score'))
    # dataMy.save()
    # dataMy=DataMy(name='jack',score=20)
    # dataMy.save()
    data=DataMy.objects.order_by("-score")[:6]
    return render(request,'home.html',{'data':data})
from django.shortcuts import render

def index(request):
    return render(request,'staticpages/index.html')

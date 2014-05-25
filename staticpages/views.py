from django.shortcuts import render
from django.http import HttpResponse
from posts.models import Category

def index(request):
    categories = Category.objects.all()
    context = {"categories":categories}
    return render(request,'staticpages/index.html',context)
    
'''    
def variable_request(request):
  if request.is_ajax():
    if 'var' in request.GET:
      var = request.GET.get('var')
      return HttpResponse(var)
    else:
      return HttpResponse('False')
'''

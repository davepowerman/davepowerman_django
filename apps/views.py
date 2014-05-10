from django.shortcuts import render,redirect
from django.http import HttpResponse
from davepowerman.settings import BASE_DIR,STATIC_URL
from apps.models import App
from apps.forms import AppForm
import os

def index(request):
  apps = App.objects.order_by()
  form = AppForm()
  context = {"apps":apps,"form":form}
  return render(request,'apps/index.html',context)
  
def run(request,app_id):
  app = App.objects.get(id=app_id)
  app_path = os.path.join(BASE_DIR,'apps','templates','apps',app.slug)
  static_path = os.path.join(BASE_DIR,'static','apps',app.slug)
  template_path = os.path.join(app_path,'index.html')
  static_url = os.path.join(STATIC_URL,'apps',app.slug)
  
  context = {
    "app": app,
    "template": template_path,
    "app_ready": True,
    "APP_STATIC_URL": static_url
  }
  if not os.path.exists(app_path):
    context["app_ready"] = False
  return render(request,'apps/run.html',context)
  
def new(request):
  form = AppForm()
  if request.method=='POST':
    form = AppForm(request.POST,request.FILES)
    if form.is_valid():
      app = App()
      app.name = form.cleaned_data['name']
      app.setSlug(app.name)
      if 'thumbnail' in request.FILES:
        app.thumbnail = request.FILES['thumbnail']
      
      
      root = os.path.join(BASE_DIR,'apps','templates','apps',app.slug)
      new_locations = [
        root,
        os.path.join(root,'css'),
        os.path.join(root,'js'),
        os.path.join(root,'img'),
      ]
      for path in new_locations:
        if not os.path.exists(path):
          print path
      app.save()
      return redirect('apps:index')
    else:
      return redirect('apps:new')
  context = {"form":form}
  return render(request,'apps/index.html',context)
  
def delete(request,app_id):
  app = App.objects.get(id=app_id)
  if app:
    app.delete()
  return redirect('/apps')

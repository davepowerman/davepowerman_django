from django.core.urlresolvers import resolve
from posts.models import Category

def global_vars(request):
  categories = Category.objects.all()
  namespace = resolve(request.path).namespace
  context = {
    "CATEGORIES": categories,
    "NAMESPACE": namespace,
  }
  return context

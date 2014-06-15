from django.core.urlresolvers import resolve
from articles.models import Feed, Category

def global_vars(request):
  categories = Category.objects.all()
  
  namespace = resolve(request.path).namespace
  
  if 'feed_slug' in resolve(request.path).kwargs:
    slug = resolve(request.path).kwargs['feed_slug']
    feed = Feed.objects.get(slug=slug)
  else:
    feed = None
  
  context = {
    "CATEGORIES": categories,
    "NAMESPACE": namespace,
    "FEED": feed
  }
  
  return context

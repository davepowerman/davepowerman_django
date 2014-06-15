from django.shortcuts import render
from articles.models import Article

def index(request):
  newest_post = Article.objects.order_by('date')[0]
  context = {"newest_post":newest_post}
  return render(request,'staticpages/index.html',context)

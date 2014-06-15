from django.shortcuts import render, redirect
from django.http import HttpResponse
from articles.models import Feed, Article, Comment, Reply, Category
from articles.forms import ArticleForm

# Create your views here.

def index(request,feed_slug):
  feed = Feed.objects.get(slug=feed_slug)
  feed.article_set = feed.article_set.order_by('date')
  context = {"feed":feed}
  return render(request,'articles/index.html',context)


def show(request,feed_slug,article_id):
  feed = Feed.objects.get(slug=feed_slug)
  article = feed.article_set.get(id=article_id)
  context = {"feed":feed,"article":article}
  return render(request,'articles/article.html',context)
  
  
def filter(request,feed_slug,category_slug):
  feed = Feed.objects.get(slug=feed_slug)
  category = Category.objects.get(slug=category_slug)
  articles = feed.article_set.filter(category=category).order_by('date')
  context = {"feed":feed,"category":category,"articles":articles}
  return render(request,'articles/filter.html',context)
  

def new(request,feed_slug):
  feed = Feed.objects.get(slug=feed_slug)
  form = ArticleForm()
  if request.method=='POST':
    form = ArticleForm(request.POST,request.FILES)
    if form.is_valid():
      name = form.cleaned_data['name']
      category_slug = form.cleaned_data['category']
      body = form.cleaned_data['body']
      image = form.cleaned_data['image']
      category = Category.objects.get(slug=category_slug)
      
      article = Article()
      article.name = name
      article.feed = feed
      article.body = body
      if image:
        article.image = image
      article.save()
      article.categories.add(category)
      article.save()
      
      return redirect('articles:index',feed_slug=feed_slug)
  context = {"feed":feed,"form":form}
  return render(request,'articles/new.html',context)  


def create(request,feed_slug):
  return render(request,'articles/new.html')


def edit(request,feed_slug,article_id):
  return render(request,'articles/new.html')


def update(request,feed_slug,article_id):
  return render(request,'articles/new.html')

def destroy(request,feed_slug,article_id):
  if request.method=='POST':
    article = Article.objects.get(id=article_id)
    article.delete()
    return redirect('articles:index',feed_slug=feed_slug)
    
  else:
    article = Article.objects.get(id=article_id)
    article.delete()
    return redirect('articles:index',feed_slug=feed_slug)

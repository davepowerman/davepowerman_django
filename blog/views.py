from django.shortcuts import render, redirect
from django.http import HttpResponse
from blog.models import Blog, Article
from blog.forms import ArticleForm
from posts.models import Comment, Reply, Category

# Create your views here.

def index(request,blog_slug):
  blog = Blog.objects.get(slug=blog_slug)
  blog.article_set = blog.article_set.order_by('date')
  context = {"blog":blog}
  return render(request,'blog/index.html',context)

def filter(request,blog_slug,category_id):
  blog = Blog.objects.get(slug=blog_slug)
  category = Category.objects.get(id=category_id)
  articles = blog.article_set.filter(category=category).order_by('date')
  context = {"blog":blog,"category":category,"articles":articles}
  return render(request,'blog/filter.html',context)
  
def read(request,blog_slug,article_id):
  blog = Blog.objects.get(slug=blog_slug)
  article = blog.article_set.get(id=article_id)
  context = {"blog":blog,"article":article}
  return render(request,'blog/article.html',context)
  

def new(request,blog_slug):
  blog = Blog.objects.get(slug=blog_slug)
  form = ArticleForm()
  if request.method=='POST':
    form = ArticleForm(request.POST,request.FILES)
    if form.is_valid():
      name = form.cleaned_data['name']
      category_id = form.cleaned_data['category']
      body = form.cleaned_data['body']
      thumbnail = form.cleaned_data['thumbnail']
      category = Category.objects.get(id=category_id)
      
      article = Article()
      article.name = name
      article.category = category
      article.blog = blog
      article.body = body
      if thumbnail:
        article.thumbnail = thumbnail
      article.save()
      
      return redirect('blog:index',blog_slug=blog_slug)
  context = {"blog":blog,"form":form}
  return render(request,'blog/new.html',context)  

def delete(request, blog_slug,article_id):
  if request.method=='POST':
    article = Article.objects.get(id=article_id)
    article.delete()
    return redirect('blog:index')
    
  else:
    article = Article.objects.get(id=article_id)
    article.delete()
    return redirect('blog:index')
    
def get_categories(request):
  if request.is_ajax():
    categories = [c.name for c in Category.objects.all()]
    return HttpResponse(categories)
  else:
    return redirect('/')

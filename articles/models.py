from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

class Feed(models.Model):
  name = models.CharField(max_length=75)
  description = models.TextField()
  slug = models.SlugField(unique=True)
  
  def save(self, *args, **kwargs):
    self.slug = slugify(self.name)
    super(Feed, self).save(*args, **kwargs)
  
  def __unicode__(self):
    return self.name

class Article(models.Model):
  name = models.CharField(max_length=75)
  body = models.TextField()
  feed = models.ForeignKey('Feed')
  image = models.ImageField(upload_to='images',blank=True)
  categories = models.ManyToManyField('Category')
  author = models.ForeignKey(User,blank=True,null=True)
  date = models.DateTimeField(auto_now_add=True)
  rating = models.IntegerField(default=0) # 0-5 stars
  rank = models.IntegerField(default=0) # number representing rank
  
  def __unicode__(self):
    return self.name
    

class Category(models.Model):
  name = models.CharField(max_length=75)
  image = models.ImageField(upload_to='images',blank=True)
  description = models.TextField()
  slug = models.SlugField(unique=True)
  
  def save(self, *args, **kwargs):
    self.slug = slugify(self.name)
    super(Category, self).save(*args, **kwargs)
  #parent = models.ForeignKey('Category',blank=True,null=True)
  
  def __unicode__(self):
    return self.name

    
class Comment(models.Model):
  body = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  author = models.OneToOneField(User)
  article = models.ForeignKey('Article')
  
  def __unicode__(self):
    return self.body[:20]
  
  
class Reply(models.Model):
  body = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  author = models.OneToOneField(User)
  comment = models.ForeignKey('Comment')
  
  def __unicode__(self):
    return self.body[:20]

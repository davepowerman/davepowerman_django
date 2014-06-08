from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

class Post(models.Model):
  name = models.CharField(max_length=75)
  body = models.TextField()
  thumbnail = models.ImageField(upload_to='images',blank=True)
  date = models.DateTimeField(auto_now_add=True)
  rating = models.IntegerField(default=0)
  rank = models.IntegerField(default=0)
  category = models.ForeignKey('Category') # TODO many to many
  user = models.ForeignKey(User,blank=True,null=True)
  slug = models.SlugField(unique=True)
  
  def save(self, *args, **kwargs):
    self.slug = slugify(self.name)
    super(Post, self).save(*args, **kwargs)
  
  def __unicode__(self):
    return self.name
    

class Category(models.Model):
  name = models.CharField(max_length=75)
  parent = models.ForeignKey('Category',blank=True,null=True)
  prefix = models.CharField(max_length=3,default=str(name)[:3])
  
  def __unicode__(self):
    return self.name

    
class Comment(models.Model):
  body = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  user = models.OneToOneField(User)
  post = models.ForeignKey('Post')
  
  def __unicode__(self):
    return self.body[:20]
  
  
class Reply(models.Model):
  body = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  user = models.OneToOneField(User)
  comment = models.ForeignKey('Comment')
  
  def __unicode__(self):
    return self.body[:20]

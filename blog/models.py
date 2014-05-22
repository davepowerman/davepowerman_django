from django.db import models
from posts.models import Post

class Blog(models.Model):
  name = models.CharField(max_length=75)
  
  def __unicode__(self):
    return self.name

class Article(Post):
  blog = models.ForeignKey('Blog')

from django.db import models
from django.template.defaultfilters import slugify
from posts.models import Post

class Blog(models.Model):
  name = models.CharField(max_length=75)
  slug = models.SlugField(unique=True)
  
  def save(self, *args, **kwargs):
    self.slug = slugify(self.name)
    super(Blog, self).save(*args, **kwargs)
  
  def __unicode__(self):
    return self.name

class Article(Post):
  blog = models.ForeignKey('Blog')

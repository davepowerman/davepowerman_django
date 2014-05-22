from davepowerman import settings
import os
import json


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "davepowerman.settings")

from blog.models import Blog
from posts.models import Category

# settings
CATEGORIES_FILE = os.path.join(settings.BASE_DIR,'categories.json')


# create blog
if not "News" in [b.name for b in Blog.objects.all()]:
  blog = Blog(name="News")
  blog.save()

# create categories
f = open(CATEGORIES_FILE,'r')
JSON = f.read()
#data = json.loads(JSON)
f.close()
#print data['categories']

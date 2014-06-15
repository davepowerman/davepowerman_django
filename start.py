from davepowerman import settings
import os
import json


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "davepowerman.settings")

from articles.models import Feed, Category

# settings
CATEGORIES_FILE = os.path.join(settings.BASE_DIR,'categories.json')


# functions

def is_iterable(value):
  t = type(value)
  if t==type({}) or t==type([]) or t==type(()):
    
    return True
  else:
    #print "cannot iterate %s" % t
    return False
  
def is_dictionary(value):
  t = type(value)
  if t==type({}):
    return True
  else:
    return False

def recurse(context,callback=None,indent=0,parent=None):
  if is_iterable(context):
    for item in context:      
      if not is_iterable(item):
        if callback:
          callback(item,parent)
        print '\t'*indent + '- '+ item
        indent+=1
        parent = item
        
      
      if is_dictionary(context):
        recurse(context[item],callback,indent,parent)
      else:
        recurse(item,callback,indent,parent)

def make_category(category,parent_name):
  if parent_name in [c.name for c in Category.objects.all()]:
    parent = Category.objects.get(name=parent_name)
  if not category in [c.name for c in Category.objects.all()]:
    category = Category(name=category)
    if parent_name:
      category.parent = parent
    category.save()

# begin doing stuff

# create feeds
feeds = ["News","Make It","Learn It"]

[b.delete() for b in Feed.objects.all()]

for feed in feeds:
  if not feed in [b.name for b in Feed.objects.all()]:
    print "creating feed \"%s\"" % feed
    Feed(name=feed).save()

# create categories
f = open(CATEGORIES_FILE,'r')
json_string = f.read()
cleaned_data = json.loads(json_string)
f.close()

print "rebuilding category tree"
for c in Category.objects.all():
  c.delete()
recurse(cleaned_data['categories'],make_category)

print "\ninitialization successfully finished."

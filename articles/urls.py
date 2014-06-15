from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
  url(r'/$','articles.views.index',name='index'),
  url(r'/new$','articles.views.new',name='new'),
  url(r'/create$','articles.views.create',name='create'),
  url(r'/(?P<article_id>\d+)$','articles.views.show',name='show'),
  url(r'/(?P<category_slug>[^/]+)$','articles.views.filter',name='filter'),
  url(r'/(?P<article_id>\d+)/edit$','articles.views.edit',name='edit'),
  url(r'/(?P<article_id>\d+)/update$','articles.views.update',name='update'),
  url(r'/(?P<article_id>\d+)/destroy$','articles.views.destroy',name='destroy'),
)

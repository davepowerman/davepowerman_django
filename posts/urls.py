from django.conf.urls import patterns,url

urlpatterns = patterns('',
    url(r'^$',                             'posts.views.index',   name='index'),
    url(r'^/new$',                         'posts.views.new',     name='new'),
    url(r'^/(?P<post_id>[0-9]+)$',         'posts.views.open',    name='open'),
    url(r'^/(?P<post_id>[0-9]+)/delete$',  'posts.views.delete',  name='delete'),
)

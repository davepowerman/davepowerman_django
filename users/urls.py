from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
  url(r'$',name='index'),
  url(r'/(?P<user_slug>\[^/]+)','users.views.show',name='show'),
  url(r'/new','users.views.new',name='new'),
  url(r'/create','users.views.create',name='create'),
  url(r'/edit','users.views.edit',name='edit'),
  url(r'/update','users.views.update',name='update'),
  url(r'/destroy','users.views.destroy',name='destroy'),
)

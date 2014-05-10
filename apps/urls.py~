from django.conf.urls import patterns,url

urlpatterns = patterns('',
    url(r'^$',                            'apps.views.index', name='index'),
    url(r'^/new$',                        'apps.views.new', name='new'),
    url(r'^/(?P<app_id>[0-9]+)$',         'apps.views.run',   name='run'),
    url(r'^/(?P<app_id>[0-9]+)/delete$',  'apps.views.delete', name='delete'),
)

from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'davepowerman.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    
    (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': '/var/www/davepowerman/static/'}),
    
    url(r'^$', include('staticpages.urls', namespace='static')),
    
    url('^apps', include('apps.urls', namespace='apps')),
)

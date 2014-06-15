from django.conf.urls import patterns, include, url, static
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'davepowerman.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    
    #url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': '/var/www/davepowerman/static/'}),
    
    #url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': '/var/www/davepowerman/media/'}),
    
    url(r'^$', include('staticpages.urls', namespace='static')),
    
    url('^apps', include('apps.urls', namespace='apps')),
    
    url('^(?P<feed_slug>make[-]it|learn[-]it|news)', include('articles.urls', namespace='articles')),
)   

urlpatterns += static.static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
urlpatterns += static.static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)

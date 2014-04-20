from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'davepowerman.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    
    url(r'^robots\.txt$', 'django.views.generic.simple.direct_to_template',
    {'template': 'robots.txt', 'mimetype': 'text/plain'}),
    url(r'^favicon\.ico$', 'django.views.generic.simple.redirect_to',
    {'url': '/media/img/favicon.ico'}),

    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^', include('staticpages.urls', namespace='static')),
)

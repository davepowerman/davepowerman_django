from django.conf.urls import patterns,url

urlpatterns = patterns('',
    url(r'^$', 'staticpages.views.index', name='index'),
    #l(r'^/get$', 'staticpages.views.variable_request', name='getvar'),
)

"""
Django settings for davepowerman project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '0p5+g!n@zjf40*tdy*#wokoaa_=wfr)fkr)@z2!(xrc-df5s^5'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []

APPEND_SLASH = False

FILE_UPLOAD_PERMISSIONS = 0644

# Application definition

INSTALLED_APPS = (
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
  'staticpages',
  'apps',
  'articles',
)

MIDDLEWARE_CLASSES = (
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'django.contrib.auth.middleware.AuthenticationMiddleware',
  'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

TEMPLATE_CONTEXT_PROCESSORS = (
  "django.contrib.auth.context_processors.auth",
  "django.core.context_processors.debug",
  "django.core.context_processors.i18n",
  "django.core.context_processors.media",
  "django.core.context_processors.static",
  "django.core.context_processors.tz",
  "django.contrib.messages.context_processors.messages",
  'davepowerman.context_processors.global_vars'
)

ROOT_URLCONF = 'davepowerman.urls'

WSGI_APPLICATION = 'davepowerman.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'davepowerman',
    'USER': 'root',
    'PASSWORD': 'L1nv*she11',
    'HOST': '',
    'PORT': '3306',
  }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR,'static')

# media files (uploaded media)

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR,'media')

# template directories

TEMPLATE_DIRS = (
  os.path.join(BASE_DIR,'templates'),
)

# heroku configuration
import socket
if socket.gethostname() != 'falcon':
  #import deploy_settings
  import dj_database_url
  #import os
  #BASE_DIR = os.path.dirname(os.path.dirname(__file__))

  DEBUG = True

  TEMPLATE_DEBUG = False
  DATABASES = {
    "default": dj_database_url.config()#{
     #"ENGINE": "django.db.backends.postgresql_psycopg2",
    #}
  }

  # Honor the 'X-Forwarded-Proto' header for request.is_secure()
  SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

  # Allow all host headers
  ALLOWED_HOSTS = ['*']


  STATIC_ROOT = 'staticfiles'
  STATIC_URL = '/static/'

  STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
  )
  

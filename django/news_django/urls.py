"""news_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.urls import path

from django.conf.urls import url, include
from django.contrib import admin
from theme.views import homepage #1
from django.urls import path, include


from django.template.response import TemplateResponse




# Create your views here.
def base(request):
    return TemplateResponse(request, 'basea.html')




urlpatterns = [
    url(r'^admin/', admin.site.urls), #2
    # path('admin/', admin.site.urls),
    url(r'^$', base), #3,
    url(r'^news', homepage), #3,

    path('music/', include('music.urls')),
    path('react/', include('frontend.urls')),
]





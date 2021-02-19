from django.shortcuts import render

# Create your views here.
from django.views.generic.detail import DetailView

from music.models import Songs


def index(request):
    return render(request, 'frontend/index.html')


class SongDetailView(DetailView):
    model = Songs
    template_name = 'frontend/index.html'

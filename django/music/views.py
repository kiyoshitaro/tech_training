
from rest_framework import generics
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,)
from rest_framework import viewsets

from .models import Songs
from .serializers import SongsSerializer
from django.shortcuts import render

# Create your views here.

def song_list(request):
    songs = Songs.objects.all().order_by('title')
    return render(request, 'music/songs.html', {'songs':songs})

class ListSongsView(generics.ListAPIView):
    """
    Provides a get method handler.
    """
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer


class SongDetailUpdateAPIView(viewsets.GenericViewSet,
                              RetrieveUpdateDestroyAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer
    lookup_field = 'id'
    # permission_classes = [IsAuthenticated]


# API get list and create
class SongListCreateAPIView(viewsets.GenericViewSet,
                            ListCreateAPIView):
    serializer_class = SongsSerializer
    queryset = Songs.objects.all()


from django.http import HttpResponse
from .forms import MusicForm
import joblib
model = joblib.load(open('models/pipe_clf_checkpoint.joblib', 'rb'))

def song_form(request):
 
    if request.method == 'POST':
        response = HttpResponse()
        model_clf = model['pipeline_clf']
        data = [request.POST['comment']]
        prediction = model_clf.prezdict(data)

        response.write("<h1>Thanks for Adding</h1></br>")
        response.write("Title: " + request.POST['title'] + "</br>")
        response.write("Artist: " + request.POST['artist'] + "</br>")
        # response.write("Comment: " + request.POST['comment'] + "</br>")
        if(prediction[0]):
            response.write("Hehe Thank u" + "</br>" + str(prediction[0]))
        else:
            response.write("Huhu sorry" + "</br>" + str(prediction[0] ))


        music = Songs(title=request.POST['title'],artist=request.POST['artist'], comment=request.POST['comment'])
        music.save()
        return response 
  
    musicForm = MusicForm(request.POST) 
    
    return render(request, 'music/base.html', {'form':musicForm})
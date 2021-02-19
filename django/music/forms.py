from django import forms
from django.db import models
from django.forms import ModelForm


 
# class Music(models.Model):
#     title = models.CharField( max_length=255)
#     artist = models.CharField( max_length=255)
#     comment = models.CharField(max_length=255)


# class MusicForm(ModelForm):
#     class Meta:
#         model = Music
#         fields = ['title', 'artist', 'comment']
 

 
class MusicForm(forms.Form):
    title = forms.CharField(label='title', max_length=255)
    artist = forms.CharField(label='artist', max_length=255)
    comment = forms.CharField(label='comment',max_length=255)
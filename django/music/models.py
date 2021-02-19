from django.db import models

# Create your models here.


from django.forms import ModelForm


 

class Songs(models.Model):
    # song title
    title = models.CharField(max_length=255, null=False)
    # name of artist or group/band
    artist = models.CharField(max_length=255, null=False)

    comment = models.CharField(max_length=255, null=False, default='SOME STRING')

    def __str__(self):
        return "{} - {}".format(self.title, self.artist)


# class SongForm(ModelForm):
#     class Meta:
#         model = Songs
#         fields = ['title', 'artist', 'comment']
 

from django.urls import path

from .views import index, SongDetailView

urlpatterns = [
    path('', index),
    path('edit/<int:pk>', SongDetailView.as_view()),
    path('delete/<int:pk>', SongDetailView.as_view()),
]

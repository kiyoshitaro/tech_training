from django.urls import path
# from .views import ListSongsView

from rest_framework import routers,permissions
from django.conf.urls import url, include
from .views import SongDetailUpdateAPIView, SongListCreateAPIView, song_list,song_form 


from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.SimpleRouter()
router.register(r'songs', SongListCreateAPIView)     # đăng ký API vào router
router.register(r'songs', SongDetailUpdateAPIView)


# GET music/songs sẽ trả về list
# POST music/songs sẽ tạo mới post
# GET music/songs/:id sẽ trả về detail của post với id là :id
# PUT music/songs/:id sẽ update resource
# DELETE music/songs/:id sẽ xóa resource

schema_view = get_schema_view(
   openapi.Info(
      title="Blog API",
      default_version='v1',
      description="Test description",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', include(router.urls), name="songs-all"),
    path('', song_list, name="songs-view"),
    path('form/', song_form, name="songs-form"),

    path('doc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'), # add doc for apis


    # path('songs/', ListSongsView.as_view(), name="songs-all")
]


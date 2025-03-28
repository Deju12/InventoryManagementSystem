
from django.urls import path
from .views import RegisterViews,LoginViews,UserViews

urlpatterns = [
    path('register/',RegisterViews.as_view()),
    path('login/',LoginViews.as_view()),
    path('users/',UserViews.as_view()),
     path('users/<str:email>/',UserViews.as_view()),
]

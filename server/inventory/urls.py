
from django.urls import path
from .views import RegisterViews,LoginViews

urlpatterns = [
    path('register/',RegisterViews.as_view()),
    path('login/',LoginViews.as_view()) 
]

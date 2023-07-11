from django.contrib import admin
from django.urls import path

from .views import EcoswimView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", EcoswimView.as_view(), name = "laning_page"),
]

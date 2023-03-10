from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html'), name="chat-app" ),
    path('api/', include('api.urls')),
    path('chat/', include('chat.urls')),
    path('user/', include('user.urls')),
]

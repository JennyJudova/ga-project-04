from django.urls import path
from .views import RegisterView, LoginView, DashboardView

# ProfileView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('profile', DashboardView.as_view()),
    # path('profile/<int:pk>/', ProfileView.as_view()),
    # path('profile/<int:pk>/edit', ProfileUpdate.as_view()),
]

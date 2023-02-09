from django.urls import path
from .views import *

app_name = 'api'

urlpatterns = [
    path('', Tracking.index, name='index-package'),
    path('user', get_user, name='user'),
    path('package/create', create_package, name='create-package'),
    path('trackings', Tracking.trackings_package, name='trackings-package'),
    path('package/update', update_package, name='update-package'),
    path('package/report', report_package, name='report-package'),
    path('export_excel/<str:dater>', export_users_xls, name='export_excel'),
]

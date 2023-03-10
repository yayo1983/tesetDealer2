from django.urls import path
from .views import *

urlpatterns = [
    path('', Tracking.index, name='index-package'),
    path('user', SingOutFunctions.get_user, name='user'),
    path('csrf_cookie', GetCSRFToken.as_view(), name='csrf'),
    path('package/create', Tracking.create_package, name='create-package'),
    path('tracking/packages', Tracking.trackings_package, name='trackings-package'),
    path('package/update', Tracking.update_package, name='update-package'),
    path('package/report', Tracking.report_package, name='report-package'),
    path('export_excel/<str:dater>', export_users_xls, name='export_excel'),
]

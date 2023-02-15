from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.decorators import login_required
from .abstract_factory_form import FactoryForm
from django.http import HttpResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework import permissions
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.contrib import auth
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import TrackingForm


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({ 'success': 'User authenticated' })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })


@method_decorator(csrf_protect, name='dispatch')
class SingOutFunctions(APIView):
    permission_classes = (permissions.AllowAny, )

    def get_user(self):
        try:
            name = ['yasser']
            lastName = ["Azan"]
            data = [name, lastName]
            return Response(data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def getCSRF(request):
        return JsonResponse({'csrfToken': get_token(request)})


@method_decorator(csrf_protect, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF'})


class Tracking(APIView):
    renderer_classes = [JSONRenderer]
    permission_classes = (permissions.AllowAny,)

    def index(self):
        try:
            user = [{'name': "Yasser"}]
            
            return Response(user, status=status.HTTP_201_CREATED)
        except:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['POST'])
    @csrf_exempt
    def trackings_package(request):
        # factory = FactoryForm()
        # form = factory.create_tracking_form()
        form = TrackingForm()
        if form.valid_form('596f04388bd84f1d9ba4d0a32f9bd06d'):
            result = form.search_packages('596f04388bd84f1d9ba4d0a32f9bd06d')
            if result:
                context = {'package': result[0], 'tracking_package': result[1], 'Status': result[2]}
                return Response(context, status=status.HTTP_200_OK)
            else:
                context = {'error': 'Error en la recuperación de los datos'}
        else:
            context = {'error': 'Error en validación, revise el valor del identificador'}
        return Response(context, status=status.HTTP_400_BAD_REQUEST)

    def create_package(self, request):
        factory = FactoryForm()
        form = factory.create_package_form()
        if form.valid_form(request):
            result = form.save_create(request)
            if result:
                context = {'id': result}
                return Response(context, status=status.HTTP_200_OK)
        else:
            context = {'error': 'Error en validación'}
            Response(context, status=status.HTTP_400_BAD_REQUEST)
        form = factory.create_package_form()
        return render(request, 'package_form.html', {'form': form})

    def update_package(self, request):
        factory = FactoryForm()
        form = factory.create_update_tracking_form(request)
        if form.valid_form():
            package = form.save_update(request)
            if package:
                context = {'package': package}
                return Response(context, status=status.HTTP_200_OK)
        else:
            context = {'error': 'Error en validación'}
            Response(context, status=status.HTTP_400_BAD_REQUEST)


    def report_package(self, request):
        factory = FactoryForm()
        form = factory.create_report_package_form()
        if form.valid_form():
            result = form.report_trackings()
            if result:
                context = {'trackings': result[0], 'Status': result[1],
                           'date': request.POST['date_report']}
                return Response(context, status=status.HTTP_200_OK)
        else:
            context = {'error': 'Error en validación'}
            Response(context, status=status.HTTP_400_BAD_REQUEST)


@api_view(('GET',))
@renderer_classes((JSONRenderer,))
def get_user(self):
    try:
        name = ['yasser']
        lastName = ["Azan"]
        data = [name, lastName]
        return Response(data)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@login_required
def export_users_xls(request, dater):
    if request.method == "GET":
        response = HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="trackings.xls"'
        factory = FactoryForm()
        form = factory.create_report_tracking_form(request.POST)
        response = form.export_users_xls(response, dater)
        return response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.decorators import login_required
from .abstract_factory_form import FactoryForm
from django.http import HttpResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer


class Tracking(APIView):
    renderer_classes = [JSONRenderer]

    def index(self):
        try:
            user = [{'name': "Yasser"}]
            
            return Response(user, status=status.HTTP_201_CREATED)
        except:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

    def trackings_package(self, request):
        factory = FactoryForm()
        form = factory.create_tracking_form()
        if form.valid_form(request.POST['idPackage']):
            result = form.search_packages(request.POST['idPackage'])
            if result:
                context = {'package': result[0], 'tracking_package': result[1], 'Status': result[2]}
                return Response(context, status=status.HTTP_200_OK)
        context = {'error': 'Error en validación'}
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

    @login_required
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

    def get_user(self):
        try:
            name = ['yasser']
            lastName = ["Azan"]
            data = [name, lastName]
            return Response(data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

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
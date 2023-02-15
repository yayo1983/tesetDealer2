from django import forms
from .models import Package, Tracking, Status
from django.db import transaction
from django.db import IntegrityError
from .serializers import TrackingSerializers, PackageSerializers
from .utils import send_user_mail, put_status_e_to_end, export_users_xls, choices
from datetime import datetime
from .abstract_factory_model import FactoryModel
from django.core import serializers
import json


class PackageForm:
    def valid_form(request):
        try:
            if len(request.post['description']) == 0 or len(request.post['addressOrigin']) == 0 or len(
                    request.post['addressDestination']) == 0 or len(request.post['email']) == 0 or \
                    request.post['size'].isnumeric() is False:
                return False

        except Package.DoesNotExist:
            return False
        return True

    @transaction.atomic()
    def save_create(request):
        try:
            factory = FactoryModel()
            package = factory.create_package_model
            package.description = request.post['description'].strip()
            package.size = request.post['size']
            package.email_receiver = request.post['email_receiver'].strip()
            package.status = 'I'
            package.save()

            tracking = factory.create_tracking_model()
            tracking.address = request.post['address_origin'].strip()
            tracking.date = datetime.now()
            tracking.package = package
            tracking.status = 'I'
            tracking.save()

            tracking = factory.create_tracking_model()
            tracking.address = request.post['address_destination'].strip()
            tracking.package = package
            tracking.status = 'E'
            tracking.save()
            return package.id
        except IntegrityError:
            return False


class TrackingForm:
    def valid_form(self, id):
        try:
            Package.objects.get(pk=id)
        except Package.DoesNotExist:
            return False
        return True

    def search_packages(self, id):
        try:
            package = Package.objects.filter(pk=id)[:1]
            package[0].status = json.dumps(package[0], default=str)
            trackings = Tracking.objects.filter(package=package)
            serialized_package = serializers.serialize('json', package)
            serialized_tracking = serializers.serialize('json', trackings)
            serialized_package = json.loads(serialized_package)
            serialized_tracking = json.loads(serialized_tracking)
            # serializer_tracking = TrackingSerializers(trackings, many=True)
            # data = put_status_e_to_end(serializer_tracking.data)
            return [serialized_package, serialized_tracking, Status]
        except Package.DoesNotExist:
            return False


class UpdateTrackingForm(forms.Form):
    def valid_form(request):
        try:
            status = request.POST['status']
            package = Package.objects.get(pk=request.POST['id'])
            if status == 'I':
                return False
                # raise forms.ValidationError("El paquete ya no debe volver a tener el estado Iniciado")
            if package.status == 'E' and status != 'A':
                return False
                # raise forms.ValidationError(
                #    "Solo se puede cambiar para el estado Aceptado cuando el paquete tiene el estado de Entregado")
        except Package.DoesNotExist:
            return False
            #raise forms.ValidationError("No es un válido indentificador")
        return True

    @transaction.atomic()
    def save_update(request):
        try:
            package = Package.objects.get(pk=request.post['id'])
            package.status = request.post['status']
            package.save()
            factory = FactoryModel()
            tracking = factory.create_tracking_model()
            if request.post['status'] is 'E':
                tracking = Tracking.objects.filter(package=package).filter(status='E').first()
                send_user_mail(package.email_receiver, package.id)
            else:
                tracking.address = request.post['address']
                tracking.date = datetime.now()
                tracking.package = package
                tracking.status = request.post['status']
            tracking.date = datetime.now()
            tracking.save()
        except IntegrityError:
            raise forms.ValidationError("Error, contacte al admnistrador")
        return package


class ReportPackageForm(forms.Form):
    def valid_form(request):
        date_report = request.post['date_report']
        if date_report == "":
            return False
        return True

    def report_trackings(request):
        try:
            trackings = Tracking.objects.filter(date__date=request.post['date_report'])
            serializer_tracking = TrackingSerializers(trackings, many=True)
            return [serializer_tracking.data, Status]
        except:
            return False

    def export_users_xls(self, response, date):
        columns = ['ID de rastreo ', 'Estado del rastreo', 'Fecha de rastreo', 'Ubicación']
        rows = Tracking.objects.filter(date__date=date).values_list('id', 'status', 'date', 'address')
        return export_users_xls(response, columns, rows, nameSheet='Package-Tracking')

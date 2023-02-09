from rest_framework import serializers
from .models import Tracking, Package


class TrackingSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tracking
        fields = '__all__'


class PackageSerializers(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'
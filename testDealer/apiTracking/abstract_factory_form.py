from abc import ABC, abstractmethod
from .forms import PackageForm, TrackingForm, UpdateTrackingForm, ReportPackageForm


class AbstractFactoryForm(ABC):

    @abstractmethod
    def create_package_form(self):
        pass

    @abstractmethod
    def create_tracking_form(self):
        pass

    @abstractmethod
    def create_update_tracking_form(self):
        pass

    @abstractmethod
    def create_report_tracking_form(self):
        pass


class FactoryForm(AbstractFactoryForm):

    def create_package_form(self):
        return PackageForm()

    def create_tracking_form(self):
        return TrackingForm()

    def create_update_tracking_form(self):
        return UpdateTrackingForm()

    def create_report_tracking_form(self):
        return ReportPackageForm()

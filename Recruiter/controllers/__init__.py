from django.urls import path, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from .AccountsController import AccountsController
from .ApplicationsController import ApplicationsController
from .JobsController import JobsController
from .TestController import TestController
from .TestScoreController import TestScoreController
from .ExperiencesController import ExperiencesController

urlpatterns = [
    path("accounts/", AccountsController()),
    path("applications/", ApplicationsController()),
    path("jobs/", JobsController()),
    path("tests/", TestController()),
    path("test_scores/", TestScoreController()),
    path("experiences/", ExperiencesController()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    re_path(r"^.*$", TemplateView.as_view(
        template_name="Recruiter/%s.html" %("debug" if settings.DEBUG else "index")
    ))
]
from utils.controller import Controller
from utils.decorators import ensure_post, ensure_signed_in, ensure_staff
from utils.shortcuts import json_response, paginate
from RecruiterApp import models
from django.db.models import Q
import json, datetime

class AccountsController(Controller):
    
    @Controller.route()
    @Controller.decorate(ensure_signed_in)
    def ping(self, request):
        data = request.user.dict
        if request.user.is_staff:
            data["numberOfApplications"] = models.ApplicationModel.objects.count()
            data["numberOfTests"] = models.TestModel.objects.count()
            data["numberOfJobs"] = models.JobModel.objects.count()
            data["numberOfAccounts"] = models.UserModel.objects.filter(is_staff=False).count()
        else:
            data["numberOfApplications"] = request.user.applications.count()

        return json_response(200, data=data)

    @Controller.route()
    @Controller.decorate(ensure_staff)
    def list_users(self, request):
        query = request.GET.get("q")
        page = request.GET.get("p", 1)
        filters = Q(first_name__contains=query) | Q(last_name__contains=query) | Q(email__contains=query)
        recruits = models.UserModel.objects.filter(
            filters,
            is_staff=False, 
            is_superuser=False,
        )
        recruits_data, previous_page, next_page, number_of_pages  = paginate(recruits, page)
        return json_response(
            200, 
            data=[recruit.dict for recruit in recruits_data],
            previous_page=previous_page,
            next_page=next_page,
            number_of_pages=number_of_pages
        )

    @Controller.route()
    @Controller.decorate(ensure_signed_in, ensure_post)
    def upload_cv(self, request):
        request.user.cv = request.FILES["cv"]
        request.user.save()
        return json_response(200)
        
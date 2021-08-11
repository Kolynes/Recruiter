from utils.controller import Controller
from utils.decorators import ensure_post, ensure_signed_in, ensure_staff
from utils.shortcuts import json_response, paginate
from RecruiterApp import models

class ApplicationsController(Controller):

    @Controller.route()
    @Controller.decorate(ensure_post, ensure_signed_in)
    def apply(self, request):
        try: 
            models.ApplicationModel.objects.create(
                job=models.JobModel.objects.get(id=request.POST["id"]),
                user=request.user
            )
            return json_response(201)
        except models.JobModel.DoesNotExist:
            return json_response(404, error={
                "summary": "This job was not found"
            })
        
    @Controller.route()
    @Controller.decorate(ensure_signed_in)
    def list_applications(self, request):
        query = request.GET.get("q")
        page = request.GET.get("p")
        if request.user.is_staff:
            applications = models.ApplicationModel.objects.filter(
                job__position__contains=query, 
                user__email__contains=query, 
                user__first_name__contains=query, 
                user__last_name__contains=query
            )
        else:
            applications = models.ApplicationModel.objects.filter(job__position__contains=query, user=request.user)
        applications_data, previous_page, next_page, number_of_pages = paginate(applications, page)
        return json_response(
            200, 
            data=[application.dict for application in applications_data],
            previous_page=previous_page,
            next_page=next_page,
            number_of_pages=number_of_pages
        )

    @Controller.route()
    @Controller.decorate(ensure_post, ensure_staff)
    def set_status(self, request):
        try:
            application = models.ApplicationModel.objects.get(id=request.POST["id"])
            application.status = request.POST["status"]
            application.save()
            return json_response(200)
        except models.ApplicationModel.DoesNotExist:
            return json_response(404, error={
                "summary": "This application was not found"
            })

    @Controller.route()
    @Controller.decorate(ensure_post, ensure_staff)
    def set_test(self, request):
        try:
            test = models.TestModel.objects.get(id=request.POST["testId"])
            application = models.ApplicationModel.objects.get(id=request.POST["applicationId"])
            application.test = test
            application.save()
            return json_response(200)
        except models.ApplicationModel.DoesNotExist:
            return json_response(404, error={
                "summary": "This application was not found"
            })
        except models.TestModel.DoesNotExist:
            return json_response(404, error={
                "summary": "This Test was not found"
            })

    @Controller.route()
    @Controller.decorate(ensure_post, ensure_staff)
    def set_interview_link(self, request):
        try: 
            application = models.ApplicationModel.objects.get(id=request.POST["applicationId"])
            application.interview_link = request.POST["interviewLink"]
            application.save()
            return json_response(200)
        except models.ApplicationModel.DoesNotExist:
            return json_response(404, error={
                "summary": "This application does not exist"
            })


    @Controller.route()
    @Controller.decorate(ensure_signed_in)
    def delete(self, request):
        try:
            if request.user.is_staff:
                models.ApplicationModel.objects.get(id=request.GET["id"]).delete()
            else:
                models.ApplicationModel.objects.get(id=request.GET["id"], user=request.user).delete()
            return json_response(200)
        except models.ApplicationModel.DoesNotExist:
            return json_response(404, error={
                "summary": "This application was not found"
            })
                
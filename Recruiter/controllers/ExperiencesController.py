from utils.controller import Controller
from utils.decorators import ensure_post, ensure_signed_in, ensure_staff
from utils.shortcuts import json_response, paginate
from Recruiter import models
from django.db.models import Q
import json, datetime

class ExperiencesController(Controller):

    @Controller.route()
    @Controller.decorate(ensure_signed_in, ensure_post)
    def update(self, request):
        experience = models.ExperienceModel(
            id=request.POST.get("id"),
            from_date=request.POST.get("fromDate"),
            type=request.POST.get("type").upper()[0],
            details=request.POST.get("details"),
            institution=request.POST.get("institution"),
            user=request.user
        )
        if request.POST.get("toDate") != "":
            experience.to_date = request.POST.get("toDate")
        experience.save()
        return json_response(200)

    @Controller.route()
    @Controller.decorate(ensure_signed_in, ensure_post)
    def create(self, request):
        experience = models.ExperienceModel(
            from_date=request.POST.get("fromDate"),
            type=request.POST.get("type").upper()[0],
            details=request.POST.get("details"),
            institution=request.POST.get("institution"),
            user=request.user
        )
        if request.POST.get("toDate") != "":
            experience.to_date = request.POST.get("toDate")
        experience.save()
        return json_response(201)

    @Controller.route()
    @Controller.decorate(ensure_signed_in)
    def get(self, request):
        account = models.UserModel.objects.get(
            id=request.GET["id"]
        )
        experiences = [experience.dict for experience in account.experiences.all()]
        return json_response(
            200,
            data=json.dumps(experiences)
        )

    @Controller.route()
    @Controller.decorate(ensure_signed_in, ensure_post)
    def delete(self, request):
        try:
            models.ExperienceModel.objects.get(
                id=request.POST["id"]
            ).delete()
            return json_response(200)
        except models.ExperienceModel.DoesNotExist:
            return json_response(404, error={
                "summary": "This data was not found"
            })


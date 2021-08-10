from utils.controller import Controller
from utils.decorators import ensure_post, ensure_staff
from utils.shortcuts import json_response, paginate
from RecruiterApp import models

class JobsController(Controller):

    @Controller.route()
    @Controller.decorate(ensure_post, ensure_staff)
    def create(self, request):
        try:
            models.JobModel.objects.create(
                position=request.POST["position"],
                description=request.POST["description"]
            )
            return json_response(201)
        except:
            return json_response(500, error={
                "summary": "Failed to save new job"
            })

    @Controller.route()
    def list_jobs(self, request):
        query = request.GET.get("q", "")
        page = request.GET.get("p", 1)
        jobs = models.JobModel.objects.filter(
            position__contains=query,
            description__contains=query
        )
        jobs_page, previous_page, next_page, number_of_pages = paginate(jobs, page)
        data = [job.dict for job in jobs_page]
        for job in data:
            job["applied"] = request.user.applications.filter(job__id=job["id"]).exists()
        return json_response(
            200,
            data=data,
            previous_page=previous_page,
            next_page=next_page,
            number_of_pages=number_of_pages
        )

    @Controller.route()
    @Controller.decorate(ensure_post)
    def update(self, request):
        try:
            job = models.JobModel.objects.get(id=request.POST["id"])
            job.position = request.POST["position"]
            job.description = request.POST["description"]
            job.save()
            return json_response(200)
        except models.JobModel.DoesNotExist:
            return json_response(404, error={
                "summary": "This job was not found"
            })

    @Controller.route()
    @Controller.decorate(ensure_staff, ensure_post)
    def delete(self, request):
        try: 
            models.JobModel.objects.get(id=request.POST["id"]).delete()
        finally:
            return json_response(200)


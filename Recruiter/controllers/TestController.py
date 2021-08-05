from utils.controller import Controller
from utils.shortcuts import json_response, paginate
from utils.decorators import ensure_post, ensure_signed_in, ensure_staff
from Recruiter import models
import datetime

class TestController(Controller):

    @Controller.route()
    @Controller.decorate(ensure_staff, ensure_post)
    def create(self, request):
        models.TestModel.objects.create(
            name=request.POST["name"],
            q_and_a=request.POST["qAndA"]
        )
        return json_response(201)

    @Controller.route()
    @Controller.decorate(ensure_signed_in)
    def list_tests(self, request):
        query = request.GET.get("q")
        page = request.GET.get("p")
        tests = models.TestModel.objects.filter(name__contains=query)
        test_data, previous_page, next_page, number_of_pages = paginate(tests, page)
        return json_response(
            200, 
            data=[test.dict for test in test_data],
            number_of_pages=number_of_pages,
            previous_page=previous_page,
            next_page=next_page
        )

    @Controller.route()
    @Controller.decorate(ensure_staff, ensure_post)
    def update(self, request):
        try:
            test = models.TestModel.objects.get(id=request.POST["id"])
            test.name = request.POST["name"]
            test.q_and_a=request.POST["qAndA"]
            test.save()
            return json_response(200)
        except models.TestModel.DoesNotExist:
            return json_response(404, error={
                "summary": "test not found"
            })

    @Controller.route()
    @Controller.decorate(ensure_staff)
    def delete(self, request):
        try:
            models.TestModel.objects.get(id=request.GET["id"]).delete()
            return json_response(200)
        except models.TestModel.DoesNotExist:
            return json_response(404, error={
                "summary": "test not found"
            })
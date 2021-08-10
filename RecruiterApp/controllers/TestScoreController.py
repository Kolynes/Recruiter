from django.db.models import Q
from RecruiterApp import models
from utils.controller import Controller
from utils.decorators import ensure_post, ensure_signed_in, ensure_staff
from utils.shortcuts import json_response, paginate


class TestScoreController(Controller):

    @Controller.route()
    @Controller.decorate(ensure_signed_in, ensure_post)
    def create(self, request):
        try:
            application = models.ApplicationModel.objects.get(id=request.POST["applicationId"])
            test_score = models.TestScoreModel(
                answers=request.POST["answers"]
            )
            test_score.save()
            application.test_score = test_score
            application.save()
            return json_response(201)
        except models.TestModel.DoesNotExist:
            return json_response(404, error={
                "summary": "test not found"
            })

    @Controller.route()
    @Controller.decorate(ensure_staff, ensure_post)
    def score_test(self, request):
        try:
            test_score = models.TestScoreModel.objects.get(id=request.POST["testScoreId"])
            test_score.score = request.POST["score"]
            test_score.save()
            return json_response(200)
        except models.TestScoreModel.DoesNotExist:
            return json_response(404, error={
                "summary": "The test score was not found"
            })
        


    

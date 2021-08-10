from django.db import models

class ApplicationModel(models.Model):
    APPROVED = "A"
    DECLINED = "D"
    PENDING = "P"

    STATUS_CHOICES = (
        (APPROVED, "Approved"),
        (DECLINED, "Declined"),
        (PENDING, "Pending")
    )

    job = models.ForeignKey("JobModel", on_delete=models.CASCADE, related_name="applications")
    user = models.ForeignKey("UserModel", on_delete=models.CASCADE, related_name="applications")
    test = models.ForeignKey("TestModel", on_delete=models.SET_NULL, null=True, blank=True, related_name="applications")
    test_score = models.ForeignKey("TestScoreModel", on_delete=models.SET_NULL, null=True, blank=True, related_name="applications")
    interview_link = models.CharField(max_length=1000, null=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=PENDING)
    created_on = models.DateTimeField(auto_now_add=True)

    @property
    def dict(self):
        return {
            "id": self.id,
            "job": self.job.dict,
            "user": self.user.dict,
            "test": self.test.dict if self.test else None,
            "testScore": self.test_score.dict if self.test_score else None,
            "status": self.get_status_display(),
            "interviewLink": self.interview_link,
            "createdOn": self.created_on.isoformat(),
        }
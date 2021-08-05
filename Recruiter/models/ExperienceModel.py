from django.db import models
from datetime import date

class ExperienceModel(models.Model):
    EDUCATION = "E"
    WORK = "W"

    TYPE_CHOICES = (
        (EDUCATION, "Education"),
        (WORK, "Work"),
    )

    institution: str = models.CharField(max_length=500)
    from_date: date = models.DateField()
    to_date: date = models.DateField(null=True)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES)
    details = models.TextField()
    user = models.ForeignKey("UserModel", on_delete=models.CASCADE, related_name="experiences")

    @property
    def dict(self):
        return {
            "id": self.id,
            "institution": self.institution,
            "fromDate": self.from_date.isoformat(),
            "toDate": self.to_date.isoformat() if self.to_date else "",
            "details": self.details,
            "type": self.get_type_display()
        }

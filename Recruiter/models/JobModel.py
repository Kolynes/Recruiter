from django.db import models
from datetime import datetime
class JobModel(models.Model):
    position = models.CharField(max_length=100)
    description = models.TextField()
    created_on: datetime = models.DateTimeField(auto_now_add=True)

    @property
    def dict(self):
        return {
            "id": self.id,
            "position": self.position,
            "description": self.description,
            "createdOn": self.created_on.isoformat(),
        }

    class Meta:
        verbose_name = "Job"


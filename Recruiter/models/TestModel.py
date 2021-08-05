from django.db import models
import json

class TestModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    q_and_a = models.TextField()

    @property
    def dict(self):
        return {
            "id": self.id,
            "createdOn": self.created_on.isoformat(),
            "name": self.name,
            "qAndA": json.loads(self.q_and_a),
        }

    class Meta:
        verbose_name = "Test"
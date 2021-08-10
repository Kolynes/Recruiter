from django.db import models
import json

class TestScoreModel(models.Model):
    answers = models.TextField()
    score = models.CharField(max_length=200, null=True)

    @property
    def dict(self):
        return {
            "answers": json.loads(self.answers),
            "score": self.score,
            "id": self.id
        }

    class Meta:
        verbose_name = "Test Score"
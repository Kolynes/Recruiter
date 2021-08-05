# Generated by Django 2.2 on 2021-08-03 15:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Recruiter', '0010_testscoremodel_score'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='testscoremodel',
            name='test',
        ),
        migrations.AddField(
            model_name='applicationmodel',
            name='test_score',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='applications', to='Recruiter.TestScoreModel'),
        ),
    ]

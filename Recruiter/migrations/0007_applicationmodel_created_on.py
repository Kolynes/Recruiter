# Generated by Django 2.2 on 2021-07-27 16:26

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Recruiter', '0006_auto_20210725_2212'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicationmodel',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
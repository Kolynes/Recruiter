# Generated by Django 2.2 on 2021-07-25 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Recruiter', '0004_auto_20210721_1549'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experiencemodel',
            name='to_date',
            field=models.DateField(null=True),
        ),
    ]
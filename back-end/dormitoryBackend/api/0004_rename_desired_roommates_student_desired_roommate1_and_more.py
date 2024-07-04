# Generated by Django 5.0.6 on 2024-06-18 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_student_published_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='desired_roommates',
            new_name='desired_roommate1',
        ),
        migrations.AddField(
            model_name='student',
            name='desired_roommate2',
            field=models.TextField(blank=True, null=True),
        ),
    ]
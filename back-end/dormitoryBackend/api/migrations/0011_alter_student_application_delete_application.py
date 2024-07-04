# Generated by Django 4.2.13 on 2024-07-04 18:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('status_check', '0007_remove_application_desired_roommate1_and_more'),
        ('api', '0010_alter_student_contact_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='application',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='>        ),
        migrations.DeleteModel(
            name='Application',
        ),
    ]
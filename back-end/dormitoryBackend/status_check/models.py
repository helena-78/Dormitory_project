from django.db import models
from api.models import Student, Room
class Application(models.Model):
    application_id = models.BigAutoField(primary_key=True, verbose_name='ID заявки')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='applications_by_student')
    room = models.ForeignKey(Room, null=True, blank=True, on_delete=models.CASCADE, related_name='applications_from_room')
    STATUS_CHOICES = (
        ('Submitted', 'Подано'),
        ('Approved', 'Одобрено'),
        ('Rejected', 'Відхилино'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Submitted', verbose_name='Статус')
    application_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        db_table = 'applications'

    def __str__(self):
        return f'Заявка #{self.application_id}'





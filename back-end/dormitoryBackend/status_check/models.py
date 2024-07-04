from django.db import models

class Application(models.Model):
    application_id = models.BigAutoField(primary_key=True, verbose_name='ID заявки')
    student_id = models.BigIntegerField(blank=True, null=True, verbose_name='ID студента')
    room_id = models.BigIntegerField(blank=True, null=True, verbose_name='ID кімнати')
    STATUS_CHOICES = (
        ('Submitted', 'Подано'),
        ('Approved', 'Одобрено'),
        ('Rejected', 'Відхилино'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Submitted', verbose_name='Статус')
    application_date = models.DateField(auto_now_add=True, verbose_name='Дата подачі заявки')
    desired_roommates = models.TextField(blank=True, null=True, verbose_name='Бажані сусіди')
    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        db_table = 'applications'

    def __str__(self):
        return f'Заявка #{self.application_id}'





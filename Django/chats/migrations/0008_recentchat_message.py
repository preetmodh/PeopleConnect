# Generated by Django 3.2.4 on 2021-08-11 11:10

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0007_auto_20210810_1523'),
    ]

    operations = [
        migrations.AddField(
            model_name='recentchat',
            name='message',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
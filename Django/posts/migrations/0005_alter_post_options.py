# Generated by Django 3.2.4 on 2021-08-10 10:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_alter_likes_unique_together'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-posted']},
        ),
    ]
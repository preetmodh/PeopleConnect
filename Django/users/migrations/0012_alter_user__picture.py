# Generated by Django 3.2.4 on 2021-08-18 10:42

from django.db import migrations, models
import gdstorage.storage


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_rename_picture_user__picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='_picture',
            field=models.ImageField(blank=True, null=True, storage=gdstorage.storage.GoogleDriveStorage(), upload_to='maps', verbose_name='Picture'),
        ),
    ]

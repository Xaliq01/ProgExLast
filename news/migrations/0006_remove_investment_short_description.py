# Generated by Django 5.2.1 on 2025-05-24 06:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0005_investment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='investment',
            name='short_description',
        ),
    ]

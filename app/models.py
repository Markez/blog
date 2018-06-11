# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import datetime
from django.db import models
from django.contrib.auth.models import User
# Create your models here.


# models for departments
class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    order_number = models.IntegerField(max_length=50)
    order_item = models.TextField(max_length=1000)
    date = models.DateTimeField(default=datetime.datetime.now)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __unicode__(self):
        return self.order_number
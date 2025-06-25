from django.contrib import admin

from app.models import User, Category, Cart, CartItem, Products, Order, OrderItem

# Register your models here.


admin.site.register([User,Category,Cart,CartItem,Products,Order,OrderItem])
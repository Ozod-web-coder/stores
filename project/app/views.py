from itertools import product
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.serializers import serialize
from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from app.func import end_point
from app.models import User, Category, Products, Cart, CartItem, Order, OrderItem
from app.serializers import RegisterSerializer, CatSER, ProSER, CiSER, OrderSER, OiSER, CartSER

Register = end_point(User, RegisterSerializer, AllowAny)

CategoryViewSet = end_point(Category, CatSER, AllowAny)

ProductViewSet = end_point(Products, ProSER, AllowAny)

CartViewSet = end_point(Cart, CartSER, AllowAny)

CartItemViewSet = end_point(CartItem, CiSER, IsAuthenticated)

OrderViewSet = end_point(Order, OrderSER,AllowAny)

OrderItemViewSet = end_point(OrderItem, OiSER,AllowAny)

@api_view(['GET'])
def get_p_by_id(request, pk):
    product = Products.objects.get(pk=pk)
    serializer = ProSER(product)
    return Response(serializer.data)


class ProductCatViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProSER

    def get_queryset(self):
        category_name = self.request.query_params.get('category')
        if category_name:
            return self.queryset.filter(category__name__iexact=category_name)
        return self.queryset



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_product_from_cart(request, product_id):
    try:
        cart = Cart.objects.get(user=request.user)
        cart_item = CartItem.objects.get(cart=cart, product__id=product_id)
        cart_item.delete()
        return Response({'detail': 'Product removed from cart.'}, status=status.HTTP_204_NO_CONTENT)
    except CartItem.DoesNotExist:
        return Response({'detail': 'Item not found in cart.'}, status=status.HTTP_404_NOT_FOUND)
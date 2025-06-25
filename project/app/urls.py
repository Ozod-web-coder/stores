from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter

from app import views
from app.views import Register, CategoryViewSet, ProductViewSet, CartViewSet, CartItemViewSet, OrderViewSet, \
    OrderItemViewSet, ProductCatViewSet, remove_product_from_cart

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('products', ProductViewSet, basename='products')
router.register('register', Register, basename='register')
router.register('cart', CartViewSet, basename='cart')
router.register('cartitem', CartItemViewSet, basename='cartitem')
router.register('order', OrderViewSet, basename='order')
router.register('orderitem', OrderItemViewSet, basename='orderitem')
router.register('categorypro', ProductCatViewSet, basename='categorypro')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/<int:pk>/', views.get_p_by_id),
    path('cartitem/remove/<int:product_id>/', remove_product_from_cart),

]
from rest_framework import serializers

from app.models import User, Category, Cart, CartItem, Order, OrderItem, Products


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username','password']


    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        Cart.objects.create(user=user)
        return user




class CatSER(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','parent']



class ProSER(serializers.ModelSerializer):
    category = CatSER()
    class Meta:
        model = Products
        fields = ['id','name','description','image','price','quantity','category']



class CartSER(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'user']



class CiSER(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id','product','quantity']



class OrderSER(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id','user','address','status']



class OiSER(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id','order','product','quantity']
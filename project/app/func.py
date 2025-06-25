from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from app.models import Cart


def end_point(model, seria, per):
    class Class(viewsets.ModelViewSet):
        queryset = model.objects.all()
        serializer_class = seria

        def get_permissions(self):
            return [per()]

        def perform_create(self, serializer):
            cart, _ = Cart.objects.get_or_create(user=self.request.user)
            serializer.save(cart=cart)
    return Class
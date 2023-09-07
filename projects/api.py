from rest_framework import viewsets, permissions, status
from .models import Usuarios, Personas, Paciente, Medico, Farmaceutico, Roles, Medicamento, Receta, DetalleReceta
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist  # Agrega esta importación
from .serializers import (
    UsuariosSerializer,
    PersonasSerializer,
    PacienteSerializer,
    MedicoSerializer,
    FarmaceuticoSerializer,
    RolesSerializer,
    MedicamentoSerializer,
    RecetaSerializer,
    DetalleRecetaSerializer,
    LoginSerializer,
    serializers
)

class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuariosSerializer

class PersonasViewSet(viewsets.ModelViewSet):
    queryset = Personas.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PersonasSerializer

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PacienteSerializer

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    print(queryset.query)
    permission_classes = [permissions.AllowAny]
    serializer_class = MedicoSerializer

class FarmaceuticoViewSet(viewsets.ModelViewSet):
    queryset = Farmaceutico.objects.all()
    print(queryset.query)
    permission_classes = [permissions.AllowAny]
    serializer_class = FarmaceuticoSerializer

class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RolesSerializer

class MedicamentoViewSet(viewsets.ModelViewSet):
    queryset = Medicamento.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = MedicamentoSerializer

class RecetaViewSet(viewsets.ModelViewSet):
    queryset = Receta.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RecetaSerializer

class DetalleRecetaViewSet(viewsets.ModelViewSet):
    queryset = DetalleReceta.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DetalleRecetaSerializer
    def get_queryset(self):
        queryset = DetalleReceta.objects.all()
        id_receta = self.request.query_params.get('id_receta', None)
        if id_receta is not None:
            queryset = queryset.filter(receta__id_receta=id_receta)
        return queryset
class LoginViewSet(viewsets.ModelViewSet):
    serializer_class = LoginSerializer
    queryset = []

    def create(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        nombre_usuario = serializer.validated_data['nombre_usuario']
        try:
            usuario = Usuarios.objects.get(nombre_usuario=nombre_usuario)
        except Usuarios.DoesNotExist:
            raise serializers.ValidationError('El usuario no existe.')

        clave = serializer.validated_data['clave']

        if usuario.clave != clave:
            raise serializers.ValidationError('Contraseña incorrecta.')

        try:
            persona = Personas.objects.get(usuarios=usuario)  # Corrección aquí
        except Personas.DoesNotExist:
            raise serializers.ValidationError('No se encontraron datos de la persona asociada al usuario.')

        rol = persona.roles.id_rol
        persona_serializer = PersonasSerializer(persona)

        role_handlers = {
            1: self.handle_farmaceutico,
            2: self.handle_medico,
            3: self.handle_cliente
        }

        if rol in role_handlers:
            return role_handlers[rol](persona_serializer)
        else:
            return Response(persona_serializer.data, status=status.HTTP_200_OK)

    def handle_farmaceutico(self, persona_serializer):
        farmaceutico = Farmaceutico.objects.get(personas=persona_serializer.instance)  # Corrección aquí
        farmaceutico_serializer = FarmaceuticoSerializer(farmaceutico)
        return Response({
            'persona': persona_serializer.data,
            'farmaceutico': farmaceutico_serializer.data
        }, status=status.HTTP_200_OK)

    def handle_medico(self, persona_serializer):
        medico = Medico.objects.get(personas=persona_serializer.instance)  # Corrección aquí
        medico_serializer = MedicoSerializer(medico)
        return Response({
            'persona': persona_serializer.data,
            'medico': medico_serializer.data
        }, status=status.HTTP_200_OK)

    def handle_cliente(self, persona_serializer):
        return Response({
            'persona': persona_serializer.data
        }, status=status.HTTP_200_OK)

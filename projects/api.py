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
    serializers,
    RecetaCreateSerializer,
    DetalleRecetaSerializer,
    DetalleRecetaCreateSerializer
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

class RecetaCreateViewSet(viewsets.ModelViewSet):
    queryset = Receta.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RecetaCreateSerializer    

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

class DetalleRecetaCreateViewSet(viewsets.ModelViewSet):
    queryset = DetalleReceta.objects.all()
    serializer_class = DetalleRecetaCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = DetalleRecetaCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
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
            persona = Personas.objects.get(usuarios=usuario)
        except Personas.DoesNotExist:
            raise serializers.ValidationError('No se encontraron datos de la persona asociada al usuario.')

        persona_serializer = PersonasSerializer(persona)
        print("Persona obtenida:", persona)
        # Intentar encontrar el rol de la persona
        if Medico.objects.filter(persona=persona_serializer.instance).exists():
            return self.handle_medico(persona_serializer)
            print(Farmaceutico.objects.filter(persona=persona_serializer.instance).query)
        elif Farmaceutico.objects.filter(persona=persona_serializer.instance).exists():
            return self.handle_farmaceutico(persona_serializer)
            print(Farmaceutico.objects.filter(persona=persona_serializer.instance).query)
        elif Paciente.objects.filter(persona=persona_serializer.instance).exists():  # Asumo que la tabla se llama Cliente
            return self.handle_paciente(persona_serializer)
        else:
            return Response({'error': 'El usuario no tiene un rol asignado.'}, status=status.HTTP_404_NOT_FOUND)

    def handle_medico(self, persona_serializer):
        medico = Medico.objects.get(persona=persona_serializer.instance)
        medico_serializer = MedicoSerializer(medico)
        return Response({
            'persona': persona_serializer.data,
            'medico': medico_serializer.data,
            'id_medico': medico.id_medico
        }, status=status.HTTP_200_OK)

    def handle_farmaceutico(self, persona_serializer):
        farmaceutico_obj = Farmaceutico.objects.get(persona=persona_serializer.instance)
        farmaceutico_serializer = FarmaceuticoSerializer(farmaceutico_obj)
        return Response({
            'persona': persona_serializer.data,
            'farmaceutico': farmaceutico_serializer.data,
            'id_farmaceutico': farmaceutico.id_farmaceutico
        }, status=status.HTTP_200_OK)

    def handle_paciente(self, persona_serializer):
        paciente_obj = Paciente.objects.get(persona=persona_serializer.instance)
        paciente_serializer = PacienteSerializer(paciente_obj)
        return Response({
            'persona': persona_serializer.data,
            'paciente': paciente_serializer.data,
            'id_paciente': paciente_obj.id_paciente  # acceder al objeto del modelo
        }, status=status.HTTP_200_OK)
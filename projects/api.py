from rest_framework import viewsets, permissions
from .models import Usuarios, Personas, Paciente, Medico, Farmaceutico, Roles, Medicamento, Receta, DetalleReceta
from .serializers import (
    UsuariosSerializer,
    PersonasSerializer,
    PacienteSerializer,
    MedicoSerializer,
    FarmaceuticoSerializer,
    RolesSerializer,
    MedicamentoSerializer,
    RecetaSerializer,
    DetalleRecetaSerializer
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
    permission_classes = [permissions.AllowAny]
    serializer_class = MedicoSerializer

class FarmaceuticoViewSet(viewsets.ModelViewSet):
    queryset = Farmaceutico.objects.all()
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

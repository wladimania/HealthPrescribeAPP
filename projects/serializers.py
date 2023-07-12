from rest_framework import serializers
from .models import Usuarios, Personas, Paciente, Medico, Farmaceutico, Roles, Medicamento, Receta, DetalleReceta

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'
class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class PersonasSerializer(serializers.ModelSerializer):
    usuarios = UsuariosSerializer()
    #roles = RolesSerializer()

    class Meta:
        model = Personas
        fields = '__all__'

    def create(self, validated_data):
        usuarios_data = validated_data.pop('usuarios')
        usuarios = Usuarios.objects.create(**usuarios_data)

        # Verificamos si el campo 'roles' está presente en los datos validados
        if 'roles' in validated_data:
            roles_data = validated_data.pop('roles')
            roles, _ = Roles.objects.get_or_create(**roles_data)
        else:
            # Si el campo 'roles' no está presente, asignamos 'None' a la relación
            roles = None

        personas = Personas.objects.create(usuarios=usuarios, roles=roles, **validated_data)

        return personas



class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__'

class FarmaceuticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmaceutico
        fields = '__all__'

class MedicamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamento
        fields = '__all__'

class RecetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receta
        fields = '__all__'

class DetalleRecetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleReceta
        fields = '__all__'

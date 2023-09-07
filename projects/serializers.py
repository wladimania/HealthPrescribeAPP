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
    roles = RolesSerializer()
    class Meta:
        model = Personas
        fields = '__all__'

    def update(self, instance, validated_data):
        usuarios_data = validated_data.pop('usuarios')
        usuarios_serializer = UsuariosSerializer(instance.usuarios, data=usuarios_data)
        if usuarios_serializer.is_valid():
            usuarios_serializer.save()

        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.edad = validated_data.get('edad', instance.edad)
        instance.genero = validated_data.get('genero', instance.genero)
        instance.roles=validated_data.get("roles",instance.roles)
        instance.save()

        return instance

    def create(self, validated_data):
        usuarios_data = validated_data.pop('usuarios')
        usuarios = Usuarios.objects.create(**usuarios_data)
        personas = Personas.objects.create(usuarios=usuarios, **validated_data)
        roles_data = validated_data.pop('Roles', None)
        if roles_data:
            roles, _ = Roles.objects.get_or_create(**roles_data)
            personas.roles = roles
            personas.save()

        return personas




class PacienteSerializer(serializers.ModelSerializer):
    persona = PersonasSerializer() 
    class Meta:
        model = Paciente
        fields = '__all__'

class MedicoSerializer(serializers.ModelSerializer):
    persona = PersonasSerializer() 
    class Meta:
        model = Medico
        fields = '__all__'

class FarmaceuticoSerializer(serializers.ModelSerializer):
    persona = PersonasSerializer()
    class Meta:
        model = Farmaceutico
        fields = '__all__'


class MedicamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamento
        fields = '__all__'

class RecetaSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer()  # Aquí se incluye el serializador del modelo Paciente
    medico = MedicoSerializer()      # Aquí se incluye el serializador del modelo Medico

    class Meta:
        model = Receta
        fields = '__all__'
    def create(self, validated_data):
        # Deserializar la información del paciente y el médico
        paciente_data = validated_data.pop('paciente')
        medico_data = validated_data.pop('medico')
        
        # Obtener las instancias del paciente y el médico basándose en sus IDs
        paciente_instance = Paciente.objects.get(id=paciente_data['id_paciente'])
        medico_instance = Medico.objects.get(id=medico_data['id_medico'])

        # Crear una nueva instancia de Receta y asociarla con el paciente y el médico
        receta = Receta.objects.create(paciente=paciente_instance, medico=medico_instance, **validated_data)
        return receta      
class RecetaCreateSerializer(serializers.ModelSerializer):
    paciente = serializers.PrimaryKeyRelatedField(queryset=Paciente.objects.all())
    medico = serializers.PrimaryKeyRelatedField(queryset=Medico.objects.all())

    class Meta:
        model = Receta
        fields = '__all__'
    def create(self, validated_data):
        # Deserializar la información del paciente y el médico
        paciente_instance = validated_data.pop('paciente')
        medico_instance = validated_data.pop('medico')
        
        # Crear una nueva instancia de Receta y asociarla con el paciente y el médico
        receta = Receta.objects.create(paciente=paciente_instance, medico=medico_instance, **validated_data)
        return receta
class DetalleRecetaSerializer(serializers.ModelSerializer):
    receta=RecetaSerializer()
    medicamento=MedicamentoSerializer()
    class Meta:
        model = DetalleReceta
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    nombre_usuario = serializers.CharField()
    clave = serializers.CharField()

    def validate(self, data):
        nombre_usuario = data.get('nombre_usuario')  # Cambio aquí
        clave = data.get('clave')

        try:
            usuario = Usuarios.objects.get(nombre_usuario=nombre_usuario)  # Cambio aquí
        except Usuarios.DoesNotExist:
            raise serializers.ValidationError('El usuario no existe.')

        if clave != usuario.clave:
            raise serializers.ValidationError('Contraseña incorrecta.')

        return data


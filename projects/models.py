from django.db import models

class Usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre_usuario = models.CharField(max_length=100)
    clave = models.CharField(max_length=100)
    tipo_usuario = models.CharField(max_length=20)
    habilitado = models.BooleanField(default=True)
    class Meta:
        managed = False
        db_table = 'usuarios'
class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20)
    class Meta:
        managed = False
        db_table = 'roles'
class Personas(models.Model):
    id_persona = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    edad = models.IntegerField(null=True)
    genero = models.CharField(max_length=10, blank=True)
    usuarios = models.ForeignKey('usuarios', models.DO_NOTHING, db_column='id_usuarios', blank=True, null=True)
    roles = models.ForeignKey('Roles', models.DO_NOTHING, db_column='id_rol', blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'personas'
class Paciente(models.Model):
    id_paciente = models.IntegerField(primary_key=True)
    persona = models.ForeignKey('personas', models.DO_NOTHING, db_column='id_persona', blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True)
    huella_dactilar = models.BinaryField(null=True)
    habilitado = models.BooleanField(default=True)
    class Meta:
        managed = False
        db_table = 'paciente'
class Medico(models.Model):
    id_medico = models.IntegerField(primary_key=True)
    persona = models.ForeignKey('personas', models.DO_NOTHING, db_column='id_persona', blank=True, null=True)
    especialidad = models.CharField(max_length=100, blank=True)
    habilitado = models.BooleanField(default=True)
    class Meta:
        managed = False
        db_table = 'medico'
class Farmaceutico(models.Model):
    id_farmaceutico = models.IntegerField(primary_key=True)
    persona = models.ForeignKey('personas', models.DO_NOTHING, db_column='id_persona', blank=True, null=True)
    habilitado = models.BooleanField(default=True)
    class Meta:
        managed = False
        db_table = 'farmaceutico'

class Medicamento(models.Model):
    id_medicamento = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    cantidad = models.IntegerField(null=True)
    concentracion = models.CharField(max_length=50, blank=True)
    laboratorio = models.CharField(max_length=100, blank=True)
    proveedor = models.CharField(max_length=100, blank=True)
    class Meta:
        managed = False
        db_table = 'medicamento'
class Receta(models.Model):
    id_receta = models.AutoField(primary_key=True)
    paciente = models.ForeignKey('paciente', models.DO_NOTHING, db_column='paciente_id', blank=True, null=True)
    medico = models.ForeignKey('medico', models.DO_NOTHING, db_column='medico_id', blank=True, null=True)
    fecha = models.DateField(null=True)
    habilitada = models.BooleanField(default=True)
    class Meta:
        managed = False
        db_table = 'receta'
class DetalleReceta(models.Model):
    id_detalle_receta = models.AutoField(primary_key=True)
    receta = models.ForeignKey('receta', models.DO_NOTHING, db_column='receta_id', blank=True, null=True)
    medicamento = models.ForeignKey('medicamento', models.DO_NOTHING, db_column='medicamento_id', blank=True, null=True)
    cantidad = models.IntegerField(null=True)
    indicaciones = models.TextField(blank=True)
    class Meta:
        managed = False
        db_table = 'detallereceta'
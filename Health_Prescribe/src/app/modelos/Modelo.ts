export interface Login {
  nombre_usuario: string;
  clave: string;
}

export interface AuthObject {
  persona?: Personas;
  cliente?: Cliente;
  farmaceutico?: Farmaceutico;
  medico?: Medico;
}

export interface Medicamento {
  id_medicamento: number;
  nombre: string;
  cantidad: number;
  concentracion: string;
  laboratorio: string;
  proveedor: string;
}
export interface InserMedicamento {
  nombre: string;
  cantidad: number;
  concentracion: string;
  laboratorio: string;
  proveedor: string;
}
export interface Usuarios {
  id_usuario: number;
  nombre_usuario: string;
  contraseña: string;
  tipo_usuario: string;
  habilitado: boolean;
}

export interface Roles {
  id_rol: number;
  nombre: string;
}

export interface Personas {
  id_persona: number;
  nombre: string;
  apellido: string;
  edad: number | null;
  genero: string;
  usuarios: Usuarios;
  roles: Roles;
}
export interface Cliente {
  id_cliente: number;
  persona: Personas;
  telefono: string;
  habilitado: boolean;
  correo: string;
}

export interface Paciente {
  id_paciente: number;
  persona: Personas;
  telefono: string;
  huella_dactilar: string | null;
  habilitado: boolean;
}

export interface Medico {
  id_medico: number;
  persona: Personas;
  especialidad: string;
  habilitado: boolean;
}

export interface Farmaceutico {
  id_farmaceutico: number;
  persona: Personas;
  habilitado: boolean;
}

export interface Receta {
  id_receta: number;
  paciente: Paciente;
  medico: Medico;
  fecha: string;
  habilitada: boolean;
}

export interface DetalleReceta {
  id_detalle_receta: number;
  receta: Receta;
  medicamento: Medicamento;
  cantidad: number | null;
  indicaciones: string;
}


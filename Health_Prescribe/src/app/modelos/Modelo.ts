
export interface AuthObject {
  persona?: Persona;
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

export interface Persona {
  id_persona: number;
  cedula?: string;
  nombre: string;
  apellido: string;
  edad: number | null;
  genero: string;
  usuarios: Usuarios;
  roles: Roles;
}

export interface Cliente {
  id_cliente: number;
  persona: Persona;
  telefono: string;
  habilitado: boolean;
  correo: string;
}

export interface Paciente {
  id_paciente: number;
  persona: Persona;
  telefono: string;
  huella_dactilar: string | null;
  habilitado: boolean;
}

export interface Medico {
  id_medico: number;
  persona: Persona;
  especialidad: string;
  habilitado: boolean;
}

export interface Farmaceutico {
  id_farmaceutico: number;
  persona: Persona;
  habilitado: boolean;
}


export interface DetalleReceta {
  id_detalle_receta: number;
  receta: Receta;
  medicamento: Medicamento;
  cantidad: number | null;
  indicaciones: string;
}




export interface Login {
  nombre_usuario: string;
  clave: string;
}


export interface Farmaceutico {
  id_farmaceutico: number;
  persona: Persona;
  habilitado: boolean;
}

export interface Medico {
  id_medico: number;
  persona: Persona;
  especializacion: string;
  habilitado: boolean;
}

export interface Proveedor {
  id_proveedor:     number;
  nombre_proveedor: string;
}

export interface Farmaco {
  id_farmaco: number;
  nombre_generico: string;
  forma_farmaceutica: string;
  inventario: number;
  concentracion: string;
  proveedor?: Proveedor;
  bar_code?: string;
}

export interface Receta {
  id_receta: number;
  medico: Medico;
  paciente: Cliente;
  codigo_receta: string;
  estado: string; // revisar
  habilitada: boolean;
  farmaceutico: Farmaceutico;
  receta_listado: RecetaListado[];
  fecha: string;
  // fecha_entrega: string;
  // create_asistido: boolean;
}

export interface RecetaListado {
  id_receta_listado: number;
  receta: Receta;
  farmaco: Farmaco;
  cantidad: number;
  dosis: number;
  aplicacion: string;
  entregado?: boolean;
}

export interface Usuarios {
  id_usuario: number;
  persona: Persona;
  usuario: string;
  clave: string;
  rol: number;
}

export interface RecetaDetalle {
  id_receta_listado: number;
  receta: Receta;
  farmaco: Farmaco;
  cantidad: number;
  dosis: number;
  aplicacion: string;
}

export interface RecetaCreate {
  codigo_receta: string;
  estado:        string;
  habilitada:    boolean;
  farmaceutico:  number | null;
  id_receta:     number;
  medico:        number;
  paciente:      number;
  fecha_create: string;
  fecha_entrega: string;
  create_asistido: boolean;
}

export interface RecetaDetalleCreate {
  aplicacion:        string;
  cantidad:          number;
  dosis:             number;
  farmaco:           number;
  id_receta_listado: number;
  receta:            number;
}

export interface Proveedor {
  id_proveedor:          number;
  nombre_proveedor:        string;
}

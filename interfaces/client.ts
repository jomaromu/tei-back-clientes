export interface ClientModelInterface {
  _id: string;
  idReferencia: string;
  idCreador: string;
  nombre: string;
  cedula?: string;
  ruc?: string;
  telefono: string;
  correo: string;
  fecha_alta: string;
  observacion: string;
  estado: boolean;
  sucursal: string;
}

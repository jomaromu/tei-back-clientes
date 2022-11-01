export interface SucursalModel {
  _id: string;
  idCreador: any;
  nombre: string;
  provincia: Provincia;
  telefono: string;
  direccion: string;
  estado: boolean;
  fecha_creacion: string;
  foranea: string;
}

interface Provincia {
  id: string;
  name: string;
}

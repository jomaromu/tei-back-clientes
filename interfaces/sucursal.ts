export interface SucursalModel {
    _id: string;
    idCreador: any;
    idReferencia: string;
    nombre: string;
    estado: boolean;
    telefono: string;
    ubicacion: Ubicacion;
    fecha_creacion: string;
}

interface Ubicacion {
    pais: string;
    ciudad: string;
    direccion: string;
}
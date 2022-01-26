export interface ClientModelInterface {
    _id: string;
    idReferencia: string;
    idCreador: string;
    nombre: string;
    apellido: string;
    identificacion?: string;
    ruc?: string;
    telefono: string;
    correo: string;
    fecha_alta: string;
    observacion: string;
    estado: boolean;
    sucursal: string;
    client_role: string;
}
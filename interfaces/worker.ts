export interface WorkerModelInterface {
    _id: string;
    idCreador: any;
    idReferencia: string;
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    telefono: string;
    fecha_alta: string;
    fecha_login: string;
    colaborador_role: string;
    cantVisitas: number;
    estado: boolean;
    sucursal: any;
    identificacion?: string;
    observacion: string;
    permitidas: Array<string>;
}
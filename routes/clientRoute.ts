import { Router, Request, Response } from 'express';
import { eliminarUsuario, verClientes, verificaToken } from '../auth/auth';
import { ClientClass } from '../class/clientClass';

// instanciar el Router
const clientRouter = Router();

// ==================================================================== //
// Crear un usuario
// ==================================================================== //
clientRouter.post('/nuevoUsuario', [verificaToken], (req: Request, resp: Response) => {

    const nuevoUsuario = new ClientClass();
    nuevoUsuario.nuevoUsuario(req, resp);
});

// ==================================================================== //
// Editar un usuario
// ==================================================================== //
clientRouter.put('/editarUsuario', [verificaToken], (req: Request, resp: Response) => {

    const editarUsuario = new ClientClass();
    editarUsuario.editarUsuario(req, resp);
});

// ==================================================================== //
// Obtener un usuario por ID
// ==================================================================== //
clientRouter.get('/obtenerUsuarioID', [verificaToken], (req: Request, resp: Response) => {

    const obtenerUsuarioID = new ClientClass();
    obtenerUsuarioID.obtenerUsuarioID(req, resp);
});

// ==================================================================== //
// Obtener un usuario por ID Referencia
// ==================================================================== //
clientRouter.get('/obtenerUsuarioIDRef', [verificaToken], (req: Request, resp: Response) => {

    const obtenerUsuarioIDRef = new ClientClass();
    obtenerUsuarioIDRef.obtenerUsuarioIDRef(req, resp);
});

// ==================================================================== //
// Obtener un usuario por Teléfono
// ==================================================================== //
clientRouter.get('/obtenerUsuarioTel', [verificaToken], (req: Request, resp: Response) => {

    const obtenerUsuarioTel = new ClientClass();
    obtenerUsuarioTel.obtenerUsuarioTel(req, resp);
});

// ==================================================================== //
// Obtener usuarios por Role
// ==================================================================== //
clientRouter.get('/obtenerUsuariosRole', [verificaToken], (req: Request, resp: Response) => {

    const obtenerUsuariosRole = new ClientClass();
    obtenerUsuariosRole.obtenerUsuariosRole(req, resp);
});

// ==================================================================== //
// Obtener un usuario por criterio nombre
// ==================================================================== //
clientRouter.get('/obtenerUsuarioCriterioNombre', [verificaToken], (req: Request, resp: Response) => {

    const obtenerUsuarioCriterioNombre = new ClientClass();
    obtenerUsuarioCriterioNombre.obtenerUsuarioCriterioNombre(req, resp);
});

// ==================================================================== //
// Obtener usuarios por sucursal
// ==================================================================== //
clientRouter.get('/obtenerUsuariosSucursal', [verificaToken], (req: Request, resp: Response) => {

    const obtenerUsuariosSucursal = new ClientClass();
    obtenerUsuariosSucursal.obtenerUsuariosSucursal(req, resp);
});

// ==================================================================== //
// Obtener usuario por sucursal
// ==================================================================== //
clientRouter.get('/obtenerUsuarioSucursal', [verificaToken], (req: Request, resp: Response) => {

    const obtenerUsuarioSucursal = new ClientClass();
    obtenerUsuarioSucursal.obtenerUsuarioSucursal(req, resp);
});

// ==================================================================== //
// Obtener todos los usuarios
// ==================================================================== //
clientRouter.get('/obtenerTodosUsuarios', [verificaToken], (req: Request, resp: Response) => {

    const obtenerTodosUsuarios = new ClientClass();
    obtenerTodosUsuarios.obtenerTodosUsuarios(req, resp);
});

// ==================================================================== //
// Eliminar un usuario
// ==================================================================== //
clientRouter.delete('/eliminarUsuario', [verificaToken, eliminarUsuario], (req: Request, resp: Response) => {

    const eliminarUsuario = new ClientClass();
    eliminarUsuario.eliminarUsuario(req, resp);
});

export default clientRouter
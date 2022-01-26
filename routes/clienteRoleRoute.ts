import { Router, Request, Response } from 'express';
import { crearUsuario, editarRoleCliente, eliminarRoleCliente, verificaToken } from '../auth/auth';
import { RoleClientClass } from '../class/clientRoleClass';

// Instanciar el router
const roleClientRouter = Router();

// Nuevo role
roleClientRouter.post('/nuevoRole', [verificaToken, crearUsuario], (req: Request, resp: Response) => {

    const nuevoRole = new RoleClientClass();
    nuevoRole.nuevoRole(req, resp);

});

// Editar role
roleClientRouter.put('/editarRole', [verificaToken, crearUsuario, editarRoleCliente], (req: Request, resp: Response) => {

    const editarRole = new RoleClientClass();
    editarRole.editarRole(req, resp);

});

// Obtener role por ID
roleClientRouter.get('/obtenerRoleID', [verificaToken], (req: Request, resp: Response) => {

    const obtenerRoleID = new RoleClientClass();
    obtenerRoleID.obtenerRoleID(req, resp);

});

// Obtener todos los roles
roleClientRouter.get('/obtenerTodos', [verificaToken], (req: Request, resp: Response) => {

    const obtenerTodos = new RoleClientClass();
    obtenerTodos.obtenerTodos(req, resp);

});

// Eliminar role
roleClientRouter.delete('/eliminarRole', [verificaToken, crearUsuario, eliminarRoleCliente], (req: Request, resp: Response) => {

    const eliminarRole = new RoleClientClass();
    eliminarRole.eliminarRole(req, resp);

});

export default roleClientRouter;
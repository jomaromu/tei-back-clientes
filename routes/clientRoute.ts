import { Router, Request, Response } from "express";
import { verificaToken } from "../auth/auth";
import { ClientClass } from "../class/clientClass";

// instanciar el Router
const clientRouter = Router();

// ==================================================================== //
// Crear un usuario
// ==================================================================== //
clientRouter.post(
  "/nuevoUsuario",
  [verificaToken],
  (req: Request, resp: Response) => {
    const nuevoUsuario = new ClientClass();
    nuevoUsuario.nuevoUsuario(req, resp);
  }
);

// ==================================================================== //
// Editar un usuario
// ==================================================================== //
clientRouter.put(
  "/editarUsuario",
  [verificaToken],
  (req: Request, resp: Response) => {
    const editarUsuario = new ClientClass();
    editarUsuario.editarUsuario(req, resp);
  }
);

// ==================================================================== //
// Obtener un usuario por ID
// ==================================================================== //
clientRouter.get(
  "/obtenerCliente",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerCliente = new ClientClass();
    obtenerCliente.obtenerCliente(req, resp);
  }
);

// ==================================================================== //
// Obtener todos los usuarios
// ==================================================================== //
clientRouter.get(
  "/obtenerTodosUsuarios",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerTodosUsuarios = new ClientClass();
    obtenerTodosUsuarios.obtenerTodosUsuarios(req, resp);
  }
);

// ==================================================================== //
// Obtener por busqueda
// ==================================================================== //
clientRouter.get(
  "/obtenerPorBusqueda",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerPorBusqueda = new ClientClass();
    obtenerPorBusqueda.obtenerPorBusqueda(req, resp);
  }
);

// ==================================================================== //
// Eliminar un usuario
// ==================================================================== //
clientRouter.delete(
  "/eliminarUsuario",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarUsuario = new ClientClass();
    eliminarUsuario.eliminarUsuario(req, resp);
  }
);

export default clientRouter;

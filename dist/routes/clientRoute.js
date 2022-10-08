"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const clientClass_1 = require("../class/clientClass");
// instanciar el Router
const clientRouter = (0, express_1.Router)();
// ==================================================================== //
// Crear un usuario
// ==================================================================== //
clientRouter.post("/nuevoUsuario", [auth_1.verificaToken], (req, resp) => {
    const nuevoUsuario = new clientClass_1.ClientClass();
    nuevoUsuario.nuevoUsuario(req, resp);
});
// ==================================================================== //
// Editar un usuario
// ==================================================================== //
clientRouter.put("/editarUsuario", [auth_1.verificaToken], (req, resp) => {
    const editarUsuario = new clientClass_1.ClientClass();
    editarUsuario.editarUsuario(req, resp);
});
// ==================================================================== //
// Obtener un usuario por ID
// ==================================================================== //
clientRouter.get("/obtenerCliente", [auth_1.verificaToken], (req, resp) => {
    const obtenerCliente = new clientClass_1.ClientClass();
    obtenerCliente.obtenerCliente(req, resp);
});
// ==================================================================== //
// Obtener todos los usuarios
// ==================================================================== //
clientRouter.get("/obtenerTodosUsuarios", [auth_1.verificaToken], (req, resp) => {
    const obtenerTodosUsuarios = new clientClass_1.ClientClass();
    obtenerTodosUsuarios.obtenerTodosUsuarios(req, resp);
});
// ==================================================================== //
// Obtener por busqueda
// ==================================================================== //
clientRouter.get("/obtenerPorBusqueda", [auth_1.verificaToken], (req, resp) => {
    const obtenerPorBusqueda = new clientClass_1.ClientClass();
    obtenerPorBusqueda.obtenerPorBusqueda(req, resp);
});
// ==================================================================== //
// Eliminar un usuario
// ==================================================================== //
clientRouter.delete("/eliminarUsuario", [auth_1.verificaToken], (req, resp) => {
    const eliminarUsuario = new clientClass_1.ClientClass();
    eliminarUsuario.eliminarUsuario(req, resp);
});
exports.default = clientRouter;

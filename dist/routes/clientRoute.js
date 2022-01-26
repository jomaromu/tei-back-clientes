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
clientRouter.post('/nuevoUsuario', [auth_1.verificaToken], (req, resp) => {
    const nuevoUsuario = new clientClass_1.ClientClass();
    nuevoUsuario.nuevoUsuario(req, resp);
});
// ==================================================================== //
// Editar un usuario
// ==================================================================== //
clientRouter.put('/editarUsuario', [auth_1.verificaToken], (req, resp) => {
    const editarUsuario = new clientClass_1.ClientClass();
    editarUsuario.editarUsuario(req, resp);
});
// ==================================================================== //
// Obtener un usuario por ID
// ==================================================================== //
clientRouter.get('/obtenerUsuarioID', [auth_1.verificaToken], (req, resp) => {
    const obtenerUsuarioID = new clientClass_1.ClientClass();
    obtenerUsuarioID.obtenerUsuarioID(req, resp);
});
// ==================================================================== //
// Obtener un usuario por ID Referencia
// ==================================================================== //
clientRouter.get('/obtenerUsuarioIDRef', [auth_1.verificaToken], (req, resp) => {
    const obtenerUsuarioIDRef = new clientClass_1.ClientClass();
    obtenerUsuarioIDRef.obtenerUsuarioIDRef(req, resp);
});
// ==================================================================== //
// Obtener un usuario por Teléfono
// ==================================================================== //
clientRouter.get('/obtenerUsuarioTel', [auth_1.verificaToken], (req, resp) => {
    const obtenerUsuarioTel = new clientClass_1.ClientClass();
    obtenerUsuarioTel.obtenerUsuarioTel(req, resp);
});
// ==================================================================== //
// Obtener usuarios por Role
// ==================================================================== //
clientRouter.get('/obtenerUsuariosRole', [auth_1.verificaToken], (req, resp) => {
    const obtenerUsuariosRole = new clientClass_1.ClientClass();
    obtenerUsuariosRole.obtenerUsuariosRole(req, resp);
});
// ==================================================================== //
// Obtener un usuario por criterio nombre
// ==================================================================== //
clientRouter.get('/obtenerUsuarioCriterioNombre', [auth_1.verificaToken], (req, resp) => {
    const obtenerUsuarioCriterioNombre = new clientClass_1.ClientClass();
    obtenerUsuarioCriterioNombre.obtenerUsuarioCriterioNombre(req, resp);
});
// ==================================================================== //
// Obtener usuarios por sucursal
// ==================================================================== //
clientRouter.get('/obtenerUsuariosSucursal', [auth_1.verificaToken], (req, resp) => {
    const obtenerUsuariosSucursal = new clientClass_1.ClientClass();
    obtenerUsuariosSucursal.obtenerUsuariosSucursal(req, resp);
});
// ==================================================================== //
// Obtener usuario por sucursal
// ==================================================================== //
clientRouter.get('/obtenerUsuarioSucursal', [auth_1.verificaToken], (req, resp) => {
    const obtenerUsuarioSucursal = new clientClass_1.ClientClass();
    obtenerUsuarioSucursal.obtenerUsuarioSucursal(req, resp);
});
// ==================================================================== //
// Obtener todos los usuarios
// ==================================================================== //
clientRouter.get('/obtenerTodosUsuarios', [auth_1.verificaToken], (req, resp) => {
    const obtenerTodosUsuarios = new clientClass_1.ClientClass();
    obtenerTodosUsuarios.obtenerTodosUsuarios(req, resp);
});
// ==================================================================== //
// Eliminar un usuario
// ==================================================================== //
clientRouter.delete('/eliminarUsuario', [auth_1.verificaToken, auth_1.eliminarUsuario], (req, resp) => {
    const eliminarUsuario = new clientClass_1.ClientClass();
    eliminarUsuario.eliminarUsuario(req, resp);
});
exports.default = clientRouter;

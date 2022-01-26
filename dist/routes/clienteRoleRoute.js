"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const clientRoleClass_1 = require("../class/clientRoleClass");
// Instanciar el router
const roleClientRouter = (0, express_1.Router)();
// Nuevo role
roleClientRouter.post('/nuevoRole', [auth_1.verificaToken, auth_1.crearUsuario], (req, resp) => {
    const nuevoRole = new clientRoleClass_1.RoleClientClass();
    nuevoRole.nuevoRole(req, resp);
});
// Editar role
roleClientRouter.put('/editarRole', [auth_1.verificaToken, auth_1.crearUsuario, auth_1.editarRoleCliente], (req, resp) => {
    const editarRole = new clientRoleClass_1.RoleClientClass();
    editarRole.editarRole(req, resp);
});
// Obtener role por ID
roleClientRouter.get('/obtenerRoleID', [auth_1.verificaToken], (req, resp) => {
    const obtenerRoleID = new clientRoleClass_1.RoleClientClass();
    obtenerRoleID.obtenerRoleID(req, resp);
});
// Obtener todos los roles
roleClientRouter.get('/obtenerTodos', [auth_1.verificaToken], (req, resp) => {
    const obtenerTodos = new clientRoleClass_1.RoleClientClass();
    obtenerTodos.obtenerTodos(req, resp);
});
// Eliminar role
roleClientRouter.delete('/eliminarRole', [auth_1.verificaToken, auth_1.crearUsuario, auth_1.eliminarRoleCliente], (req, resp) => {
    const eliminarRole = new clientRoleClass_1.RoleClientClass();
    eliminarRole.eliminarRole(req, resp);
});
exports.default = roleClientRouter;

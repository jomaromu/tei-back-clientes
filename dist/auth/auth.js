"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verClientes = exports.eliminarRoleCliente = exports.editarRoleCliente = exports.eliminarUsuario = exports.editarUsuario = exports.crearUsuario = exports.verificaToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SEED = require('../environment/environment');
// Globales
const environment_1 = require("../environment/environment");
// Modelos
const roleClientModel_1 = __importDefault(require("../models/roleClientModel"));
const verificaToken = (req, resp, next) => {
    const token = req.get('token') || '';
    // Comprobación del token
    jsonwebtoken_1.default.verify(token, environment_1.environmnet.SEED, (err, decoded) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Token incorrecto`,
                err
            });
        }
        // Insertar en el Request el usuario
        req.usuario = decoded.usuario;
        next();
    });
};
exports.verificaToken = verificaToken;
const crearUsuario = (req, resp, next) => {
    const tokenRole = req.usuario.colaborador_role;
    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    }
    else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
};
exports.crearUsuario = crearUsuario;
const editarUsuario = (req, resp, next) => {
    const tokenRole = req.usuario.colaborador_role;
    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    }
    else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
};
exports.editarUsuario = editarUsuario;
const eliminarUsuario = (req, resp, next) => {
    const tokenRole = req.usuario.colaborador_role;
    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    }
    else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
};
exports.eliminarUsuario = eliminarUsuario;
const editarRoleCliente = (req, resp, next) => {
    const id = req.get('id');
    roleClientModel_1.default.findById(id, (err, roleDB) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err
            });
        }
        if (!roleDB) {
            return resp.json({
                ok: false,
                mensaje: `No existe el role con ese ID`,
            });
        }
        if (roleDB.nivel === 0) {
            return resp.json({
                ok: false,
                mensaje: `Este role no es editable`,
            });
        }
        else {
            next();
        }
    });
};
exports.editarRoleCliente = editarRoleCliente;
const eliminarRoleCliente = (req, resp, next) => {
    const id = req.get('id');
    roleClientModel_1.default.findById(id, (err, roleDB) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err
            });
        }
        if (!roleDB) {
            return resp.json({
                ok: false,
                mensaje: `No existe el role con ese ID`,
            });
        }
        if (roleDB.nivel === 0) {
            return resp.json({
                ok: false,
                mensaje: `Este role no se puede eliminar`,
            });
        }
        else {
            next();
        }
    });
};
exports.eliminarRoleCliente = eliminarRoleCliente;
const verClientes = (req, resp, next) => {
    const colRole = req.usuario.colaborador_role;
    if (colRole === 'DiseniadorRole') {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
    else {
        next();
    }
};
exports.verClientes = verClientes;

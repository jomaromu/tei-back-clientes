"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleClientClass = void 0;
// Modelo 
const roleClientModel_1 = __importDefault(require("../models/roleClientModel"));
class RoleClientClass {
    constructor() { }
    // Nuevo role
    nuevoRole(req, resp) {
        const idCreador = req.usuario._id;
        const nombre = req.body.nombre;
        const nuevoRole = new roleClientModel_1.default({
            idCreador: idCreador,
            nombre: nombre
        });
        nuevoRole.save((err, roleDB) => {
            if (err) {
                return resp.json({
                    mensaje: `Error interno`,
                    err
                });
            }
            else {
                return resp.json({
                    ok: true,
                    mensaje: `Role ${nombre} creado`,
                    roleDB
                });
            }
        });
    }
    // Editar role
    editarRole(req, resp) {
        const id = req.get('id');
        const estado = req.get('estado');
        // const estado: boolean = castEstado(estadoHeader);
        const query = {
            nombre: req.body.nombre,
            estado: estado,
            nivel: Number(req.body.nivel)
        };
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
            if (!req.body.nombre) {
                query.nombre = roleDB.nombre;
            }
            if (!req.body.nivel) {
                query.nivel = roleDB.nivel;
            }
            if (!req.body.estado) {
                query.estado = roleDB.estado;
            }
            roleClientModel_1.default.findByIdAndUpdate(id, query, { new: true }, (err, nuevoRoleDB) => {
                if (err) {
                    return resp.json({
                        ok: false,
                        mensaje: `Error interno`,
                        err
                    });
                }
                if (!nuevoRoleDB) {
                    return resp.json({
                        ok: false,
                        mensaje: `No existe el role que quiere Editar`,
                    });
                }
                return resp.json({
                    ok: true,
                    mensaje: `Role actualizado`,
                    nuevoRoleDB
                });
            });
        });
    }
    // Obtener role por ID
    obtenerRoleID(req, resp) {
        const id = req.get('id');
        roleClientModel_1.default.findById(id, (err, roleDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error al búscar role o no existe`,
                    err
                });
            }
            if (!roleDB) {
                return resp.json({
                    ok: false,
                    mensaje: `No existe el role en la base de datos`
                });
            }
            return resp.json({
                ok: true,
                roleDB
            });
        });
    }
    // Obtener todos los roles
    obtenerTodos(req, resp) {
        const estado = req.get('estado');
        // const estado: boolean = castEstado(estadoHeader);
        roleClientModel_1.default.find({ estado: estado }, (err, rolesDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error al búscar role o no existe`,
                    err
                });
            }
            if (!rolesDB || rolesDB.length === 0) {
                return resp.json({
                    ok: false,
                    mensaje: `No existen el role en la base de datos`
                });
            }
            return resp.json({
                ok: true,
                rolesDB
            });
        });
    }
    // Eliminar un role por ID
    eliminarRole(req, resp) {
        const id = req.get('id');
        roleClientModel_1.default.findByIdAndDelete(id, {}, (err, roleDB) => {
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
                    mensaje: `No existe el role en la base de datos`
                });
            }
            return resp.json({
                ok: true,
                roleDB
            });
        });
    }
}
exports.RoleClientClass = RoleClientClass;

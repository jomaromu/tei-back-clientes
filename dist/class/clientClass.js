"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientClass = void 0;
const mongoose = require("mongoose");
const nanoid_1 = require("nanoid");
const moment_1 = __importDefault(require("moment"));
// Modelos
const clientModel_1 = __importDefault(require("../models/clientModel"));
const server_1 = __importDefault(require("./server"));
class ClientClass {
    constructor() {
        this.idRef = (0, nanoid_1.nanoid)(10);
        this.token = "";
    }
    nuevoUsuario(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const cedula = req.body.cedula;
            const ruc = req.body.ruc;
            const telefono = req.body.telefono;
            const correo = req.body.correo;
            const fecha_alta = (0, moment_1.default)().format("DD-MM-YYYY");
            const observacion = req.body.observacion;
            const sucursal = new mongoose.Types.ObjectId(req.body.sucursal);
            const estado = req.body.estado;
            // const client_role: string = req.body.client_role;
            const nuevoUsuario = new clientModel_1.default({
                idReferencia: this.idRef,
                idCreador: new mongoose.Types.ObjectId(req.usuario._id),
                nombre,
                cedula,
                ruc: ruc,
                telefono,
                correo,
                fecha_alta,
                observacion,
                sucursal,
                estado,
                // client_role: client_role,
            });
            // Insertar usuario en la DB
            nuevoUsuario.save((err, usuarioDB) => {
                if (err) {
                    return resp.json({
                        ok: false,
                        mensaje: `No se pudo guardar el usuario la DB`,
                        err,
                    });
                }
                else {
                    const server = server_1.default.instance;
                    server.io.emit("cargar-clientes", {
                        ok: true,
                    });
                    return resp.json({
                        ok: true,
                        mensaje: `Usuario Creado`,
                        usuarioDB,
                    });
                }
            });
        });
    }
    editarUsuario(req, res) {
        const id = req.get("id") || "";
        const estado = req.body.estado;
        // const estado = castEstado(estadoBody);
        const datosNuevos = {
            nombre: req.body.nombre,
            cedula: req.body.cedula,
            ruc: req.body.ruc,
            correo: req.body.correo,
            telefono: req.body.telefono,
            observacion: req.body.observacion,
            sucursal: new mongoose.Types.ObjectId(req.body.sucursal),
            estado,
            // client_role: req.get('client_role'),
        };
        clientModel_1.default.findById(id, (err, usuarioDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            if (!usuarioDB) {
                return res.json({
                    ok: false,
                    mensaje: `No se encontró un usuario con ese ID en la base de datos`,
                });
            }
            if (!req.body.nombre) {
                datosNuevos.nombre = usuarioDB.nombre;
            }
            if (!req.body.cedula) {
                datosNuevos.cedula = usuarioDB.cedula;
            }
            if (!req.body.ruc) {
                datosNuevos.ruc = usuarioDB.ruc;
            }
            if (!req.body.correo) {
                datosNuevos.correo = usuarioDB.correo;
            }
            if (!req.body.telefono) {
                datosNuevos.telefono = usuarioDB.telefono;
            }
            if (!req.body.observacion) {
                datosNuevos.observacion = usuarioDB.observacion;
            }
            if (!req.body.sucursal) {
                datosNuevos.sucursal = usuarioDB.sucursal;
            }
            clientModel_1.default.findByIdAndUpdate(id, datosNuevos, { new: true }, (err, usuarioDB) => {
                if (err) {
                    return res.json({
                        ok: false,
                        mensaje: `Error interno`,
                        err,
                    });
                }
                if (!usuarioDB) {
                    return res.json({
                        ok: false,
                        mensaje: `No se encontró un usuario con ese ID en la base de datos`,
                    });
                }
                const server = server_1.default.instance;
                server.io.emit("cargar-clientes", {
                    ok: true,
                });
                usuarioDB.password = ";)";
                return res.json({
                    ok: true,
                    mensaje: `Usuario actualizado`,
                    usuarioDB,
                });
            });
        });
    }
    obtenerCliente(req, res) {
        const id = new mongoose.Types.ObjectId(req.get("id"));
        clientModel_1.default
            .findById(id)
            .populate("sucursal")
            .populate("idCreador")
            .exec((err, usuarioDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error al búscar Usuario o no existe`,
                    err,
                });
            }
            else {
                return res.json({
                    ok: true,
                    usuarioDB,
                });
            }
        });
    }
    obtenerTodosUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const id = req.usuario._id;
            const resp = yield clientModel_1.default.aggregate([
                {
                    $lookup: {
                        from: "userworkers",
                        localField: "idCreador",
                        foreignField: "_id",
                        as: "creador",
                    },
                },
                {
                    $lookup: {
                        from: "sucursales",
                        localField: "sucursal",
                        foreignField: "_id",
                        as: "sucursal",
                    },
                },
            ]);
            if (resp) {
                return res.json({
                    ok: true,
                    mensaje: "Usuarios encontrados",
                    usuariosDB: resp,
                });
            }
            else {
                return res.json({
                    ok: false,
                    mensaje: "Error al obtener los clientes",
                    error: resp,
                });
            }
            return;
            clientModel_1.default.find({}, (err, usuariosDB) => {
                // estado: estado
                if (err) {
                    return res.json({
                        ok: false,
                        mensaje: `Error Interno`,
                        err,
                    });
                }
                return res.json({
                    ok: true,
                    mensaje: `Usuarios encontrados`,
                    usuariosDB,
                    cantUsuarios: usuariosDB.length,
                });
            });
        });
    }
    obtenerPorBusqueda(req, resp) {
        const criterio = new RegExp(req.get("criterio"), "i");
        clientModel_1.default
            .find({ $or: [{ telefono: criterio }, { nombre: criterio }] })
            .populate("sucursal")
            .populate("idCreador")
            .exec((err, usuariosDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: "Error al buscar clientes",
                    err,
                });
            }
            else {
                return resp.json({
                    ok: true,
                    usuariosDB,
                });
            }
        });
    }
    eliminarUsuario(req, res) {
        const id = req.get("id") || "";
        clientModel_1.default.findByIdAndDelete(id, {}, (err, usuarioDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: "Erro interno",
                    err,
                });
            }
            if (!usuarioDB) {
                return res.json({
                    ok: false,
                    mensaje: `No se encontró Usuario con este ID`,
                });
            }
            const server = server_1.default.instance;
            server.io.emit("cargar-clientes", {
                ok: true,
            });
            return res.json({
                ok: true,
                mensaje: `Usuario eliminado`,
                usuarioDB,
            });
        });
    }
}
exports.ClientClass = ClientClass;

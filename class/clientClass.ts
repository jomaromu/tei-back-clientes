import { Response, Request } from "express";
import { CallbackError } from "mongoose";
const mongoose = require("mongoose");
import { nanoid } from "nanoid";
import moment from "moment";

// Interfaces
import { ClientModelInterface } from "../interfaces/client";

// Modelos
import clientModel from "../models/clientModel";

import Server from "./server";

export class ClientClass {
  private idRef: string;
  private token: string;

  constructor() {
    this.idRef = nanoid(10);
    this.token = "";
  }

  async nuevoUsuario(req: any, resp: Response): Promise<any> {
    const nombre: string = req.body.nombre;
    const cedula: string = req.body.cedula;
    const ruc: string = req.body.ruc;
    const telefono: string = req.body.telefono;
    const correo: string = req.body.correo;
    const fecha_alta: string = moment().format("DD-MM-YYYY");
    const observacion: string = req.body.observacion;
    const sucursal = new mongoose.Types.ObjectId(req.body.sucursal);
    const estado: boolean = req.body.estado;
    // const client_role: string = req.body.client_role;

    const nuevoUsuario = new clientModel({
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
    nuevoUsuario.save((err: CallbackError, usuarioDB: ClientModelInterface) => {
      if (err) {
        return resp.json({
          ok: false,
          mensaje: `No se pudo guardar el usuario la DB`,
          err,
        });
      } else {
        const server = Server.instance;
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
  }

  editarUsuario(req: any, res: Response): void {
    const id = req.get("id") || "";
    const estado: boolean = req.body.estado;

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

    clientModel.findById(
      id,
      (err: CallbackError, usuarioDB: ClientModelInterface) => {
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

        clientModel.findByIdAndUpdate(
          id,
          datosNuevos,
          { new: true },
          (err: CallbackError, usuarioDB: any) => {
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

            const server = Server.instance;
            server.io.emit("cargar-clientes", {
              ok: true,
            });

            usuarioDB.password = ";)";

            return res.json({
              ok: true,
              mensaje: `Usuario actualizado`,
              usuarioDB,
            });
          }
        );
      }
    );
  }

  obtenerCliente(req: Request, res: Response): void {
    const id = new mongoose.Types.ObjectId(req.get("id"));

    clientModel
      .findById(id)
      .populate("sucursal")
      .populate("idCreador")
      .exec((err: CallbackError, usuarioDB: any) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: `Error al búscar Usuario o no existe`,
            err,
          });
        } else {
          return res.json({
            ok: true,
            usuarioDB,
          });
        }
      });
  }

  async obtenerTodosUsuarios(req: any, res: Response): Promise<any> {
    // const id = req.usuario._id;

    const resp = await clientModel.aggregate([
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
    } else {
      return res.json({
        ok: false,
        mensaje: "Error al obtener los clientes",
        error: resp,
      });
    }

    return;

    clientModel.find(
      {},
      (err: CallbackError, usuariosDB: Array<ClientModelInterface>) => {
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
      }
    );
  }

  obtenerPorBusqueda(req: any, resp: Response): void {
    const criterio = new RegExp(req.get("criterio"), "i");

    clientModel
      .find({ $or: [{ telefono: criterio }, { nombre: criterio }] })
      .populate("sucursal")
      .populate("idCreador")
      .exec((err: any, usuariosDB: Array<any>) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: "Error al buscar clientes",
            err,
          });
        } else {
          return resp.json({
            ok: true,
            usuariosDB,
          });
        }
      });
  }

  eliminarUsuario(req: Request, res: Response): void {
    const id = req.get("id") || "";

    clientModel.findByIdAndDelete(
      id,
      {},
      (err: CallbackError, usuarioDB: any) => {
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

        const server = Server.instance;
        server.io.emit("cargar-clientes", {
          ok: true,
        });

        return res.json({
          ok: true,
          mensaje: `Usuario eliminado`,
          usuarioDB,
        });
      }
    );
  }
}

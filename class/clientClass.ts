import { Response, Request } from "express";
import { Error } from "mongoose";
const mongoose = require("mongoose");
import { nanoid } from "nanoid";
// import moment from "moment";
import moment from "moment-timezone";

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
    const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
    const nombre: string = req.body.nombre;
    const cedula: string = req.body.cedula;
    const ruc: string = req.body.ruc;
    const telefono: string = req.body.telefono;
    const correo: string = req.body.correo;
    const fecha_alta: string = moment()
      .tz("America/Bogota")
      .format("DD/MM/YYYY");
    const observacion: string = req.body.observacion;
    const sucursal = new mongoose.Types.ObjectId(req.body.sucursal);
    const estado: boolean = req.body.estado;
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    // const client_role: string = req.body.client_role;

    const nuevoUsuario = new clientModel({
      idReferencia: this.idRef,
      idCreador,
      foranea,
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
    nuevoUsuario.save((err: any) => {
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
        });
      }
    });
  }

  editarUsuario(req: any, res: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
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
    };

    clientModel.findOne(
      { _id, foranea },
      (err: any, usuarioDB: ClientModelInterface) => {
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

        clientModel.findOneAndUpdate(
          { _id, foranea },
          datosNuevos,
          { new: true },
          (err: any, usuarioDB: any) => {
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
            // server.io.emit("cargar-clientes", {
            //   ok: true,
            // });
            server.io.emit("cargar-pedido", { ok: true });

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
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    clientModel
      .findOne({ _id, foranea })
      .populate("sucursal")
      .populate("idCreador")
      .exec((err: any, usuarioDB: any) => {
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
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    const resp = await clientModel.aggregate([
      {
        $match: { foranea },
      },
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
  }

  obtenerPorBusqueda(req: any, resp: Response): void {
    const criterio = new RegExp(req.get("criterio"), "i");
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    clientModel
      .find({
        $and: [
          { $or: [{ telefono: criterio }, { nombre: criterio }] },
          { foranea },
        ],
      })
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
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    clientModel.findOneAndDelete(
      { _id, foranea },
      {},
      (err: any, usuarioDB: any) => {
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

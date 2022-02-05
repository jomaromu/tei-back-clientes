import { Response, Request } from "express";
import { CallbackError } from "mongoose";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import moment from "moment";

// Interfaces
import { ClientModelInterface } from "../interfaces/client";

// Modelos
import clientModel from "../models/clientModel";

export class ClientClass {
  private idRef: string;
  private token: string;

  constructor() {
    this.idRef = nanoid(10);
    this.token = "";
  }

  //  Crear un usuario
  async nuevoUsuario(req: any, resp: Response): Promise<any> {
    const nombre: string = req.body.nombre;
    const apellido: string = req.body.apellido;
    const identificacion: string = req.body.identificacion;
    const ruc: string = req.body.ruc;
    const telefono: string = req.body.telefono;
    const correo: string = req.body.correo;
    const fecha_alta: string = moment().format("YYYY-MM-DD");
    const observacion: string = req.body.observacion;
    const sucursal = req.body.sucursal;
    // const client_role: string = req.body.client_role;

    const nuevoUsuario = new clientModel({
      idReferencia: this.idRef,
      idCreador: req.usuario._id,
      nombre: nombre,
      apellido: apellido,
      identificacion: identificacion,
      ruc: ruc,
      telefono: telefono,
      correo: correo,
      fecha_alta: fecha_alta,
      observacion: observacion,
      sucursal: sucursal,
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
        return resp.json({
          ok: true,
          mensaje: `Usuario Creado`,
          usuarioDB,
        });
      }
    });
  }

  // Editar un usuario
  editarUsuario(req: any, res: Response): void {
    const id = req.get("id") || "";
    const estado: boolean = req.body.estado;

    // const estado = castEstado(estadoBody);

    const datosNuevos = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      identificacion: req.body.identificacion,
      ruc: req.body.ruc,
      telefono: req.body.telefono,
      observacion: req.body.observacion,
      sucursal: req.body.sucursal,
      estado: estado,
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
        if (!req.body.apellido) {
          datosNuevos.apellido = usuarioDB.apellido;
        }
        if (!req.body.identificacion) {
          datosNuevos.identificacion = usuarioDB.identificacion;
        }
        if (!req.body.ruc) {
          datosNuevos.ruc = usuarioDB.ruc;
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
        if (!req.body.estado) {
          datosNuevos.estado = usuarioDB.estado;
        }
        // if (!datosNuevos.client_role) {
        //     datosNuevos.client_role = usuarioDB.client_role;
        // }

        clientModel.findByIdAndUpdate(
          id,
          datosNuevos,
          { new: true },
          (err: CallbackError, usuarioDBActualizado: any) => {
            if (err) {
              return res.json({
                ok: false,
                mensaje: `Error interno`,
                err,
              });
            }

            if (!usuarioDBActualizado) {
              return res.json({
                ok: false,
                mensaje: `No se encontró un usuario con ese ID en la base de datos`,
              });
            }

            usuarioDBActualizado.password = ";)";

            return res.json({
              ok: true,
              mensaje: `Usuario actualizado`,
              usuarioDBActualizado,
            });
          }
        );
      }
    );
  }

  // Obtener usuario por ID
  obtenerUsuarioID(req: Request, res: Response): void {
    const id = req.get("id") || "";

    clientModel
      .findById(id)
      .populate("sucursal")
      .exec((err: CallbackError, usuarioDB: any) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: `Error al búscar Usuario o no existe`,
            err,
          });
        }

        if (!usuarioDB) {
          return res.json({
            ok: false,
            mensaje: `No existe el Usuario en la base de datos`,
          });
        }

        return res.json({
          ok: true,
          usuarioDB,
        });
      });
  }

  // Obtener usuario por ID Referencia
  obtenerUsuarioIDRef(req: any, res: Response): void {
    const idReferencia = req.get("idReferencia");

    clientModel
      .findOne({ idReferencia: idReferencia })
      .populate("sucursal")
      .exec((err: any, usuarioDB: any) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: `Error al búscar Usuario o no existe`,
            err,
          });
        }

        if (!usuarioDB) {
          return res.json({
            ok: false,
            mensaje: `No existe el Usuario en la base de datos`,
          });
        }

        return res.json({
          ok: true,
          usuarioDB,
        });
      });
  }

  // Obtener usuario por Teléfono
  obtenerUsuarioTel(req: any, res: Response): void {
    const telefono: string = req.get("telefono");
    const estado: boolean = req.get("estado");

    // const estado = castEstado(estadoHeader);

    clientModel
      .find({ $and: [{ telefono: { $regex: telefono, $options: "i" } }] }) // , { estado: estado }
      .populate("sucursal")
      .exec((err: any, usuariosDB: any) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: `Error al búscar Usuario o no existe`,
            err,
          });
        }

        // if (!usuariosDB) {
        //     return res.json({
        //         ok: false,
        //         mensaje: `No existe el Usuario en la base de datos`
        //     });
        // }

        return res.json({
          ok: true,
          usuariosDB,
        });
      });
  }

  // Obtener usuarios por role
  obtenerUsuariosRole(req: any, res: Response): void {
    const role = req.get("client_role");
    const estado: boolean = req.get("estado");

    // const estado = castEstado(estadoHeader);

    clientModel
      .find({ $and: [{ client_role: role }, { estado: estado }] })
      .populate("sucursal")
      .exec((err: CallbackError, usuariosDB: Array<ClientModelInterface>) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        if (!usuariosDB || usuariosDB.length === 0) {
          return res.json({
            ok: false,
            mensaje: `No existen usuarios con ese criterio de búsqueda`,
            usuariosDB,
          });
        }

        return res.json({
          ok: true,
          usuariosDB,
        });
      });
  }

  // Obtener usuarios por criterio nombre
  obtenerUsuarioCriterioNombre(req: any, res: Response): void {
    // const criterioNombre = req.body.criterioNombre;
    // const estado: boolean = req.get("estado");
    const criterioNombre = req.get("criterio");
    const regExpCrit = RegExp(criterioNombre, "i");

    // const estado = castEstado(estadoHeader);
    // /^[a-zA-ZáéíóúÁÉÍÓU]+$/

    clientModel
      .find({ nombre: regExpCrit }) // , { estado: estado } { $and: [{ nombre: { $regex: criterioNombre, $options: "i" } }] }
      .populate("sucursal")
      .exec((err: CallbackError, usuariosDB: Array<ClientModelInterface>) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        // if (!usuariosDB || usuariosDB.length === 0) {

        //     return res.json({
        //         ok: false,
        //         mensaje: `No existen usuarios con ese criterio de búsqueda`,
        //         usuariosDB
        //     })
        // }

        return res.json({
          ok: true,
          usuariosDB,
        });
      });
  }

  // Obtener usuarios por sucursal
  obtenerUsuariosSucursal(req: any, res: Response): void {
    const sucursal = req.get("sucursal");
    const estado: boolean = req.get("estado");

    // const estado = castEstado(estadoHeader);

    clientModel
      .find({ $and: [{ sucursal: sucursal }, { estado: estado }] })
      .populate("sucursal")
      .exec((err: CallbackError, usuariosDB: Array<ClientModelInterface>) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        if (!usuariosDB || usuariosDB.length === 0) {
          return res.json({
            ok: false,
            mensaje: `No existen usuarios con ese criterio de búsqueda`,
            usuariosDB,
          });
        }

        return res.json({
          ok: true,
          usuariosDB,
        });
      });
  }

  // Obtener usuario por sucursal
  obtenerUsuarioSucursal(req: any, res: Response): void {
    const sucursal = req.get("sucursal");
    const idUsuario = req.get("idUsuario");

    clientModel
      .find({ sucursal: sucursal, _id: idUsuario })
      .populate("sucursal")
      .exec((err: any, usuariosDB: any) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        if (!usuariosDB) {
          return res.json({
            ok: false,
            mensaje: `No existen usuarios con ese criterio de búsqueda`,
            usuariosDB,
          });
        }

        return res.json({
          ok: true,
          usuariosDB,
        });
      });
  }

  // Obtener todos los usuarios
  obtenerTodosUsuarios(req: any, res: Response): void {
    const id = req.usuario._id;
    const estado: boolean = req.get("estado");

    // const estado = castEstado(estadoHeader);

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

        if (!usuariosDB) {
          return res.json({
            ok: false,
            mensaje: `No se encontraron Usuarios en la Base de datos`,
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

  // Eliminar un usuario
  eliminarUsuario(req: Request, res: Response): void {
    const id = req.get("id") || "";

    clientModel.findByIdAndDelete(
      id,
      {},
      (err: CallbackError, usuarioEliminadoDB: any) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: "Erro interno",
            err,
          });
        }

        if (!usuarioEliminadoDB) {
          return res.json({
            ok: false,
            mensaje: `No se encontró Usuario con este ID`,
          });
        }

        return res.json({
          ok: true,
          mensaje: `Usuario eliminado`,
          usuarioEliminadoDB,
        });
      }
    );
  }
}

// Interfaz para manejar los datos del archivo usuariosIDs.json
interface Archivo {
  ids: Array<string>;
}

interface RespPromise {
  ok: boolean;
  data: string;
}

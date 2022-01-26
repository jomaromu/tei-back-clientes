import { Response } from 'express';
import { CallbackError } from 'mongoose';

// Interfaces
import { RoleClientModelInterface } from '../interfaces/clientRole';

// Modelo 
import roleClientModel from '../models/roleClientModel';


export class RoleClientClass {

    constructor() { }

    // Nuevo role
    nuevoRole(req: any, resp: Response): void {

        const idCreador = req.usuario._id;
        const nombre = req.body.nombre;

        const nuevoRole = new roleClientModel({
            idCreador: idCreador,
            nombre: nombre
        });

        nuevoRole.save((err: CallbackError, roleDB: RoleClientModelInterface) => {

            if (err) {

                return resp.json({
                    mensaje: `Error interno`,
                    err
                });

            } else {

                return resp.json({
                    ok: true,
                    mensaje: `Role ${nombre} creado`,
                    roleDB
                });
            }
        });
    }

    // Editar role
    editarRole(req: any, resp: Response): void {

        const id = req.get('id');
        
        const estado: boolean = req.get('estado');
        // const estado: boolean = castEstado(estadoHeader);

        const query = {
            nombre: req.body.nombre,
            estado: estado,
            nivel: Number(req.body.nivel)
        }

        roleClientModel.findById(id, (err: CallbackError, roleDB: any) => {

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

            roleClientModel.findByIdAndUpdate(id, query, { new: true }, (err: CallbackError, nuevoRoleDB: any) => {

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
    obtenerRoleID(req: any, resp: Response): void {

        const id = req.get('id');

        roleClientModel.findById(id, (err: CallbackError, roleDB: Document) => {

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
    obtenerTodos(req: any, resp: Response): void {

        const estado: boolean = req.get('estado');
        // const estado: boolean = castEstado(estadoHeader);

        roleClientModel.find({ estado: estado }, (err: CallbackError, rolesDB: Array<Document>) => {

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
    eliminarRole(req: any, resp: Response): void {

        const id = req.get('id');

        roleClientModel.findByIdAndDelete(id, {}, (err: CallbackError, roleDB: any) => {

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
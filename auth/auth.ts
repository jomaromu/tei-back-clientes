import { NextFunction, Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import jwt from 'jsonwebtoken';
const SEED = require('../environment/environment');

// Globales
import { environmnet } from '../environment/environment';

// Modelos
import roleClientModel from '../models/roleClientModel';

// Interfaces
import { RoleClientModelInterface } from '../interfaces/clientRole';

const verificaToken = (req: any, resp: Response, next: NextFunction) => {

    const token = req.get('token') || '';

    // Comprobación del token
    jwt.verify(token, environmnet.SEED, (err: any, decoded: any) => {

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
}

const crearUsuario = (req: any, resp: Response, next: NextFunction) => {

    const tokenRole = req.usuario.colaborador_role;

    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    } else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
}

const editarUsuario = (req: any, resp: Response, next: NextFunction) => {

    const tokenRole = req.usuario.colaborador_role;

    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    } else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
}

const eliminarUsuario = (req: any, resp: Response, next: NextFunction) => {

    const tokenRole = req.usuario.colaborador_role;

    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    } else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
}

const editarRoleCliente = (req: any, resp: Response, next: NextFunction) => {

    const id = req.get('id');

    roleClientModel.findById(id, (err: CallbackError, roleDB: RoleClientModelInterface) => {

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

        } else {
            next();
        }
    });

}


const eliminarRoleCliente = (req: any, resp: Response, next: NextFunction) => {

    const id = req.get('id');

    roleClientModel.findById(id, (err: CallbackError, roleDB: RoleClientModelInterface) => {

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

        } else {
            next();
        }
    });

}

const verClientes = (req: any, resp: Response, next: NextFunction) => {

    const colRole = req.usuario.colaborador_role;

    if (colRole === 'DiseniadorRole') {

        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });

    } else {
        next();
    }
}





export {
    verificaToken,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    editarRoleCliente,
    eliminarRoleCliente,
    verClientes
}
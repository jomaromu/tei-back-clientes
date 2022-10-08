"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SEED = require("../environment/environment");
// Globales
const environment_1 = require("../environment/environment");
const verificaToken = (req, resp, next) => {
    const token = req.get("token") || "";
    // Comprobación del token
    jsonwebtoken_1.default.verify(token, environment_1.environmnet.SEED, (err, decoded) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Token incorrecto`,
                err,
            });
        }
        // Insertar en el Request el usuario
        req.usuario = decoded.usuario;
        next();
    });
};
exports.verificaToken = verificaToken;

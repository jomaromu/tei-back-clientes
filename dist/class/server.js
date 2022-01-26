"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const environment_1 = require("../environment/environment");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = new http_1.default.Server(this.app);
        this.port = environment_1.environmnet.port;
        // configuro io
        this.io = new socket_io_1.default.Server(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            }
        });
        this.escucharConexiones();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    escucharConexiones() {
        console.log('Escuchando conexiones');
        this.io.on('connection', () => {
            console.log(`Cliente conectado`);
        });
    }
    // levantar el servidor
    start(callback) {
        this.httpServer.listen(this.port, callback());
    }
}
exports.default = Server;

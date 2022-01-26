"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server_1 = __importDefault(require("./class/server"));
// rutas
const clienteRoleRoute_1 = __importDefault(require("./routes/clienteRoleRoute"));
const clientRoute_1 = __importDefault(require("./routes/clientRoute"));
// const server = new Server();
const server = server_1.default.instance;
// body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// file upload
server.app.use((0, express_fileupload_1.default)());
// cors
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
// Models
require('./models/sucursalModel');
// conexion local
mongoose_1.default.connect('mongodb://127.0.0.1:27017/todoImpresiones', { autoIndex: false }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos Online');
});
// usar las rutas
server.app.use('/clientRole', clienteRoleRoute_1.default);
server.app.use('/client', clientRoute_1.default);
// correr servidor
server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port}`);
});

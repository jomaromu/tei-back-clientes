"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const roles = {
    values: [
        "SuperRole",
        "AdminRole",
        "ProduccionVIPRole",
        "ProduccionNormalRole",
        "VendedorVIPRole",
        "VendedorNormalRole",
        "DiseniadorRole",
        "DiseniadorVIPRole",
    ],
    message: "{VALUE}, no es un role permitido",
};
// crear esquema
const Schema = mongoose_1.default.Schema;
const WorkerUserSchema = new Schema({
    idReferencia: {
        type: String,
        required: [true, `Es necesario un ID referencia`],
        unique: true,
    },
    idCreador: { type: mongoose_1.default.Types.ObjectId, ref: "userWorker" },
    nombre: { type: String },
    apellido: { type: String },
    identificacion: { type: String },
    telefono: {
        type: String,
        // requrire: [true, "El teléfono celular debe se obligatorio"],
        // unique: true,
    },
    correo: {
        type: String,
        lowercase: true,
        required: [true, "Debe ingresar un correo"],
        unique: true,
    },
    password: { type: String },
    fecha_alta: { type: String },
    fecha_login: { type: String },
    colaborador_role: { type: String, enum: roles },
    observacion: { type: String },
    cantVisitas: { type: Number, default: 0 },
    estado: { type: Boolean, default: true },
    sucursal: { type: mongoose_1.default.Types.ObjectId, ref: "sucursales" },
    permitidas: [{ type: mongoose_1.default.Types.ObjectId, ref: "sucursales" }],
    pedidos: [{ type: mongoose_1.default.Types.ObjectId, ref: "pedidos" }],
});
// validacion para único elemento
WorkerUserSchema.plugin(mongoose_unique_validator_1.default, { message: "{PATH}, ya existe!!" });
module.exports = mongoose_1.default.model("userWorker", WorkerUserSchema);

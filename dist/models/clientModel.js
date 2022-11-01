"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// crear esquema
const Schema = mongoose_1.default.Schema;
const ClientUserSchema = new Schema({
    idReferencia: {
        type: String,
        required: [true, `Es necesario un ID referencia`],
    },
    idCreador: { type: mongoose_1.default.Types.ObjectId, ref: "userWorker" },
    nombre: { type: String },
    cedula: { type: String },
    ruc: { type: String },
    telefono: {
        type: String,
        required: [true, "El teléfono celular debe se obligatorio"],
    },
    correo: { type: String, lowercase: true },
    fecha_alta: { type: String },
    observacion: { type: String },
    estado: { type: Boolean, default: true },
    sucursal: { type: mongoose_1.default.Types.ObjectId, ref: "sucursales" },
    foranea: { type: mongoose_1.default.Types.ObjectId, ref: "userWorker" },
});
// validacion para único elemento
ClientUserSchema.plugin(mongoose_unique_validator_1.default, { message: "{PATH}, ya existe!!" });
module.exports = mongoose_1.default.model("userClient", ClientUserSchema);

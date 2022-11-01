"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// crear esquema
const Schema = mongoose_1.default.Schema;
const Provincia = new Schema({
    id: { type: String },
    name: { type: String },
});
const sucursalSchema = new Schema({
    idCreador: { type: Schema.Types.ObjectId, ref: "userWorker" },
    nombre: { type: String, unique: true },
    direccion: { type: String },
    telefono: { type: String },
    provincia: { type: Provincia },
    fecha_creacion: { type: String },
    estado: { type: Boolean, default: true },
    foranea: { type: mongoose_1.default.Types.ObjectId, ref: "userWorker" },
});
// validacion para único elemento
sucursalSchema.plugin(mongoose_unique_validator_1.default, { message: "El {PATH}, ya existe!!" });
module.exports = mongoose_1.default.model("sucursales", sucursalSchema);

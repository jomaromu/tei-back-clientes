"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// crear esquema
const Schema = mongoose_1.default.Schema;
const ubicacionSchema = new Schema({
    pais: { type: String, required: [true, 'El País es necesario'], default: 'Panamá' },
    ciudad: { type: String, required: [true, 'La Ciudad es necesaria'], default: 'Panamá' },
    direccion: { type: String, required: false },
});
const sucursalSchema = new Schema({
    idCreador: { type: Schema.Types.ObjectId, ref: 'userWorker' },
    idReferencia: { type: String, required: [true, `Es necesario un ID referencia`], unique: true },
    nombre: { type: String, required: [true, 'El nombre es necesario'], unique: true },
    telefono: { type: String, required: false, default: '222222' },
    ubicacion: { type: ubicacionSchema },
    fecha_creacion: { type: String },
    estado: { type: Boolean, required: false, default: true }
});
// validacion para único elemento
sucursalSchema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH}, ya existe!!' });
module.exports = mongoose_1.default.model('sucursales', sucursalSchema);

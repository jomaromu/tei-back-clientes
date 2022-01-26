"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// Crear esquema
const Schema = mongoose_1.default.Schema;
const roleClienteSchema = new Schema({
    idCreador: { type: String },
    nombre: { type: String, unique: true },
    nivel: { type: Number, default: 1 },
    estado: { type: Boolean, default: true }
});
// validacion para único elemento
roleClienteSchema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH}, ya existe!!' });
module.exports = mongoose_1.default.model('roleCliente', roleClienteSchema);

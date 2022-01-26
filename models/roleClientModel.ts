import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Interfaces
import { RoleClientModelInterface } from '../interfaces/clientRole';

// Crear esquema
const Schema = mongoose.Schema;

const roleClienteSchema = new Schema({
    idCreador: { type: String },
    nombre: { type: String, unique: true },
    nivel: { type: Number, default: 1 },
    estado: { type: Boolean, default: true }
});

// validacion para único elemento
roleClienteSchema.plugin(uniqueValidator, { message: 'El {PATH}, ya existe!!' });

export = mongoose.model<RoleClientModelInterface>('roleCliente', roleClienteSchema);
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { ClientModelInterface } from "../interfaces/client";

// crear esquema
const Schema = mongoose.Schema;

const ClientUserSchema = new Schema({
  idReferencia: {
    type: String,
    required: [true, `Es necesario un ID referencia`],
    unique: true,
  },
  idCreador: { type: mongoose.Types.ObjectId, ref: "userWorker" },
  nombre: { type: String },
  cedula: { type: String },
  ruc: { type: String },
  telefono: {
    type: String,
    required: [true, "El teléfono celular debe se obligatorio"],
    unique: true,
  },
  correo: { type: String, lowercase: true },
  fecha_alta: { type: String },
  observacion: { type: String },
  estado: { type: Boolean, default: true },
  sucursal: { type: mongoose.Types.ObjectId, ref: "sucursales" },
});

// validacion para único elemento
ClientUserSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<ClientModelInterface>("userClient", ClientUserSchema);

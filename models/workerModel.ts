import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { WorkerModelInterface } from "../interfaces/worker";

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
const Schema = mongoose.Schema;

const WorkerUserSchema = new Schema({
  idReferencia: {
    type: String,
    required: [true, `Es necesario un ID referencia`],
    unique: true,
  },
  idCreador: { type: mongoose.Types.ObjectId, ref: "userWorker" },
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
  sucursal: { type: mongoose.Types.ObjectId, ref: "sucursales" },
  permitidas: [{ type: mongoose.Types.ObjectId, ref: "sucursales" }],
  pedidos: [{ type: mongoose.Types.ObjectId, ref: "pedidos" }],
});

// validacion para único elemento
WorkerUserSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<WorkerModelInterface>("userWorker", WorkerUserSchema);

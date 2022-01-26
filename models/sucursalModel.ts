import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Interface
import { SucursalModel } from '../interfaces/sucursal';

// crear esquema
const Schema = mongoose.Schema;

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
sucursalSchema.plugin(uniqueValidator, { message: 'El {PATH}, ya existe!!' });

export = mongoose.model<SucursalModel>('sucursales', sucursalSchema);
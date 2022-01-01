import mongoose from 'mongoose';
import { moneyDataDB } from '../databases/mongo';

const { Schema } = mongoose;

// I'm not sure what fields does this model have.
const ClientDataSchema = new Schema({
  _id: Number,
  name: String,
  money: Number
});

const ClientData = moneyDataDB.model('ClientData', ClientDataSchema);

export { ClientData };
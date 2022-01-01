import mongoose from 'mongoose';
import { playerInventoryDB } from '../databases/mongo';

const { Schema } = mongoose;

// I'm not sure what fields does this model have.
const NormalOneSchema = new Schema({
  _id: Number,
  cards: [{ card_id: Number }]
});

// I'm not sure what fields does this model have.
const DrewSchema = new Schema({
  _id: Number,
  cards: [Number]
});

const NormalOne = playerInventoryDB.model('Normal-1', NormalOneSchema);
const Drew = playerInventoryDB.model('Drew', DrewSchema);

export { NormalOne, Drew };
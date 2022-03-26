import mongoose from 'mongoose';

import Anime from './anime';

const CardTierList = ['S', 'A', 'B', 'C', 'D'];

const { Schema } = mongoose;

const cardSchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  tier: {
    type: String,
    required: true,
    enum: CardTierList
  },
  anime: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Anime
  },
  stats: {
    hp: [Number],
    str: [Number],
    def: [Number],
    agi: [Number]
  }
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
export { CardTierList };
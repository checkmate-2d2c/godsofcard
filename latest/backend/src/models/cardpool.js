import mongoose from 'mongoose';

import Card from './card';

const { Schema } = mongoose;
const cardPoolSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  cost: {
    type: Number,
    required: true
  },
  limit: Number,
  banner: {
    type: String,
    required: true
  },
  probability: {
    type: {
      S: Number,
      A: Number,
      B: Number,
      C: Number,
      D: Number,
    },
    required: true
  },
  start: {
    type: Number,
    required: true
  },
  expire: {
    type: Number,
    required: true
  },
  ten: {
    type: Boolean,
    required: true
  },
  highlight_cards: {
    type: [
      {
        type: Number,
        ref: Card
      }
    ],
    default: [],
    required: true
  }
});

const CardPool = mongoose.model('CardPool', cardPoolSchema);

export default CardPool;
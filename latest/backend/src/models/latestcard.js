import mongoose from 'mongoose';

import Card from './card';

const { Schema } = mongoose;

const latestCardSchema = new Schema({
  card: {
    type: Number,
    ref: Card,
    required: true,
    unique: true
  }
});

const LatestCard = mongoose.model('LatestCard', latestCardSchema);

export default LatestCard;
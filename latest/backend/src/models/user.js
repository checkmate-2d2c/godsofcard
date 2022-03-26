import mongoose from 'mongoose';
import Card from './card';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  cards: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Card,
        required: true
      }
    ],
    required: true,
    default: []
  }
});

const User = mongoose.model('User', userSchema);

export default User;
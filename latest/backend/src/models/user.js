import mongoose from 'mongoose';
import Card from './card';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  balance: {
    type: Number,
    required: function () { return this.balance >= 0; },
    default: 0
  },
  cards: {
    type: [
      {
        type: Number,
        ref: Card
      }
    ],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

export default User;
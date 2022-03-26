import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';

dotenv.config();

const dbConnect = () => {
  mongoose.connect(`${process.env.MONGO_URL}`, () => {
    console.log('mongodb connection created');
  });
};

export default dbConnect;
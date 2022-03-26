import mongoose from 'mongoose';

const { Schema } = mongoose;
const animeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Anime = mongoose.model('Anime', animeSchema);

export default Anime;
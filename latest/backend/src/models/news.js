import mongoose from 'mongoose';

const { Schema } = mongoose;

const newsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: String
}, {
  timestamps: true
});

const News = mongoose.model('News', newsSchema);

export default News;
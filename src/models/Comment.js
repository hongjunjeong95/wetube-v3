import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  createdAt: String,
  text: {
    type: String,
    required: 'This is comment',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const model = mongoose.model('Comment', commentSchema);

export default model;

import mongoose from 'mongoose';

const Study = mongoose.model("Study",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    notes: {
      type: String,
      default: '',
      required: true
    }
  }, { timestamps: true })
);

export default Study;
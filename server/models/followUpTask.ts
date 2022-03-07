import mongoose from 'mongoose';

const FollowUpTask = mongoose.model("FollowUpTask",
  new mongoose.Schema({
    study: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    DOB: {
      type: Date,
      required: true
    },
    windowName: {
      type: String,
      required: true
    },
    windowOpenDate: {
      type: Date,
      required: true
    },
    windowCloseDate: {
      type: Date,
      required: true
    },
    notes: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  })
);

export default FollowUpTask;
import mongoose from 'mongoose';

const FollowUpTask = mongoose.model("FollowUpTask",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    DOB: {
      type: Date,
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
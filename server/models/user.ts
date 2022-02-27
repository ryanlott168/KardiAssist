import mongoose from 'mongoose';

const User = mongoose.model("User",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    followUpTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FollowUpTask' }]
  })
);

export default User;
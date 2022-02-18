import mongoose from 'mongoose';

const User = mongoose.model("User",
  new mongoose.Schema({
    googleid: String,
    firstName: String,
    lastName: String,
    hashedPass: String,
    email: String
  })
);

export default User;
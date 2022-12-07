import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  location: { type: String },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

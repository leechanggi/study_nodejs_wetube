import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  userid: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String },
  location: { type: String },
  socialOnly: { type: Boolean, default: false },
  avatarUrl: { type: String },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

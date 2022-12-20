import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  location: { type: String },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

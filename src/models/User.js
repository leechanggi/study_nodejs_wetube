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
  videos: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  },
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

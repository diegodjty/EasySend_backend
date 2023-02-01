import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: { type: String, require: true },
  password: { type: String, require: true, trim: true },
});

const Users = mongoose.model('Users', UsersSchema);
export default Users;

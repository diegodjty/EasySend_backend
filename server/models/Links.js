import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const LinksSchema = new Schema({
  url: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  original_name: {
    type: String,
    require: true,
  },
  downloads: {
    type: Number,
    default: 1,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  created: {
    type: Date,
    default: Date,
  },
});

const Links = mongoose.model('Links', LinksSchema);
export default Links;

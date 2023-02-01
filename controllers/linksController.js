import Links from '../models/Links.js';
import shortid from 'shortid';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

const newLink = async (req, res, next) => {
  // Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { original_name, name } = req.body;

  // Create a link Object
  const link = new Links();
  link.url = shortid.generate();
  link.name = name;
  link.original_name = original_name;

  // If user is authenticated
  if (req.user) {
    const { password, downloads } = req.body;
    link.password = password;

    // Assing a number of downloads
    if (downloads) {
      link.downloads = downloads;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }

    link.autor = req.user.id;
  }

  // Save on DB
  try {
    await link.save();
    res.json({ msg: `${link.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

// Get Link
const getLink = async (req, res, next) => {
  const { url } = req.params;
  // verify if link exist
  const link = await Links.findOne({ url });

  if (!link) {
    res.status(404).json({ msg: 'Link dosnt exist' });
    return next();
  }

  // If link exist
  res.json({ file: link.name, password: false });

  next();
};

const getAllLinks = async (req, res, next) => {
  try {
    const links = await Links.find({}).select('url -_id');
    res.json({ links });
  } catch (error) {
    console.log(error);
  }
};

const hasPassword = async (req, res, next) => {
  const { url } = req.params;
  // verify if link exist
  const link = await Links.findOne({ url });

  if (!link) {
    res.status(404).json({ msg: 'Link dosnt exist' });
    return next();
  }

  if (link.password) {
    return res.json({ password: true, link: link.url });
  }
  next();
};

const verifyPassword = async (req, res, next) => {
  const { url } = req.params;

  const link = await Links.findOne({ url });
  const { password } = req.body;

  //verify password
  if (bcrypt.compareSync(password, link.password)) {
    //allow user to download fule
    next();
  } else {
    return res.status(401).json({ msg: 'Incorrect Password' });
  }
};

export { verifyPassword, newLink, getLink, getAllLinks, hasPassword };

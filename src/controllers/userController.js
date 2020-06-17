const sharp = require('sharp');
const User = require('./../models/user');
const { sendWelcomeEmail, goodByeEmail } = require('../emails/account');

const signUp = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password,
  });
  try {
    await user.save();
    sendWelcomeEmail(user.name, user.email);
    const token = await user.genarateAuthToken();

    res.status(201).json({ user, token });
  } catch (e) {
    res.status(400).json({ e });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.genarateAuthToken();
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(404).json(err);
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).json(err);
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
};

const readProfile = async (req, res) => {
  try {
    res.status(200).json({
      status: 'Success',
      user: req.user,
    });
  } catch (e) {
    res.status(500).send();
  }
};

const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteProfile = async (req, res) => {
  try {
    await req.user.remove();
    goodByeEmail(req.user.name, req.user.email);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};
const uploadAvater = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
};
const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};
const readAvater = async (req, res) => {
  if (!req.user.avatar) {
    throw new Error('No profile pic');
  }
  res.set('Content-Type', 'image/png');
  res.send(req.user.avatar);
};
module.exports = {
  signUp,
  login,
  logout,
  logoutAll,
  readProfile,
  updateProfile,
  deleteProfile,
  uploadAvater,
  deleteAvatar,
  readAvater,
};

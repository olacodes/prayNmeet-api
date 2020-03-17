const { User } = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures')

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await newUser.generateAuthToken();

    res.status(201).json({
      message: 'user successfully created',
      data: { newUser, token }
    });
  } catch (err) {
    res.status(400).json({
      message: 'fail',
      reason: { error: err }
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const users = await features.query

    res.status(200).json({
      message: 'success',
      data: { users }
    });
  } catch (err) {
    res.status(400).json({
      message: 'fail',
      err
    });
  }
};

const { User } = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError')

// A function that returns a function and invoke an async function
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
};

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = await newUser.generateAuthToken();

  res.status(201).json({
    message: 'user successfully created',
    data: { newUser, token }
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    message: 'success',
    data: { users }
  });
})

exports.getUser = catchAsync(async (req, res, next) => {
  
  const user = await User.findById(req.params._id)

  if ( !user ) {
    return next(new AppError('No user found with that ID', 404))
  } 

  res.status(200).json({
    message: 'success',
    data: { user }
  });
  
})

exports.userLogin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findByCredentials(username, password);
  if (!user) {
    return res
      .status(401)
      .json({ error: 'Login failed! Check authentication credentials' });
  }
  const token = user.generateAuthToken();
  res.status(200).json({ user });
});


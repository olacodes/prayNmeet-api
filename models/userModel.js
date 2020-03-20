const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Prepare a Schema for User
const userSchema = mongoose.Schema({
  username: {
    // type property and validation
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid email address' });
      }
    }
  },
  joinAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre('save', async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, process.env.SALT * 1);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  // Generate Token for user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  // search for user by username and verify his password
  const user = await this.User.findOne({ username });
  
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' });
  }

  // Check if the password is match using bcrypt compare built-in function 
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {    
    throw new Error({error: 'Login failed! Check authentication credentials'})
  }
  return user;
};

userSchema.statics.findAllUsers = async () => {
  const user = await this.User.find()
  return user
}


// Create Model for the schema Created
exports.User = mongoose.model('User', userSchema);

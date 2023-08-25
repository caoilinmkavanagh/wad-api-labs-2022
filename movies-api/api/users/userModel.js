import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/* const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true },
  
}); */

/* const MovieSchema = new Schema({
  id: Number,
  title: String
}); */


const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true },
/*   password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(v);
      },
      message: props => `${props.value} is not a valid password!`
    }
  },   */
  favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
  //favourites: [MovieSchema]
});

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.methods.comparePassword = function (passw, callback) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (err, salt)=> {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, (err, hash)=> {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});


export default mongoose.model('User', UserSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
bcrypt = require('bcrypt-nodejs'),
SALT_WORK_FACTOR = 10;

var mySchema = new Schema({

  email: { type: String, required: true, index: { unique: true } },
  psw: { type: String, required: true },
  phone: { type: String, required: false },
  accountType: { type: Number, required: true }

});

mySchema.pre('save', function(next) {

  var obj = this;

  // Only hash the password if it has been modified (or it is new)
  if (!obj.isModified('psw')) return next();

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {

      if (err) return next(err);

      // Hash the psw using the new salt
      bcrypt.hash(obj.pwd, salt, null, function(err, hash) {
          if (err) return next(err);
        
          // Override the cleartext password with the hashed one
          obj.pwd = hash;
          next();
      });
  });
});

mySchema.methods.comparePassword = function(candidatePassword, cb) {

  console.log('ciao1');

  bcrypt.compare(candidatePassword, 'this.pwd', function(err, isMatch) {
    console.log('ciao2');
      if (err) return cb(err);
      console.log('ciao3');
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('users', mySchema);
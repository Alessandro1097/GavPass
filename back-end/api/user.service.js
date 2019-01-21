// Request of the model
var users = require('../models/User');

// Authentication
const config = require('../topSecret/secret.json');
const jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');


module.exports = {
    authenticate,
    getAll,
    getById,
    getByEmail,
    insert,
    update,
    deleteById
};

async function authenticate(user_email, user_pwd) {
  
    users.find({ email: user_email }, function (err, result) {
        if (err) throw err;

        if (!result) return { message: 'No user found.' };

        console.log(result);

        // FIXME - user_pwd non è visibile da qui
        console.log(user_pwd);

        var passwordIsValid = bcrypt.compareSync(user_pwd, result.pwd);

            console.log(passwordIsValid);

            if (!passwordIsValid) return { auth: false, token: null };

            // const token = jwt.sign({ id: user._id }, config.secret, {
            //     expiresIn: 86400 // expires in 24 hours
            // });
            // return { auth: true, token: token };

            return { auth: true };
    });
}

// Select
async function getAll() {
    return users.find({}, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Get by ID
async function getById(id) {
    users.findById({ _id: new ObjectId(id) }, function (err, result) {
        if (err) throw err;

        const { pwd, ...userWithoutPassword } = result;
        return userWithoutPassword;
    });
};

// Get by Email
async function getByEmail(email) {
    return users.findOne({ email: email }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Insert
async function insert(email, pwd, phone, role) {

    var hashedPassword = bcrypt.hashSync(pwd, 8);

    var newRec = users({
        email: email,
        pwd: hashedPassword,
        phone: phone,
        role: role
    });

    newRec.save(function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Update
async function update(id, email, phone) {
    users.findByIdAndUpdate(new ObjectId(id), {
        email: email,
        phone: phone
    }, function (err, result) {
        if (err) throw err;
        return result;
    });
};

// Delete by ID
async function deleteById(id) {
    return users.findByIdAndRemove(new ObjectId(id), function (err, result) {
        if (err) throw err;
        return result;
    });
};
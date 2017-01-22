var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var VacationSchema = mongoose.Schema({
    userID: {
        type: String
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    },
    status: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    description: {
        type: String
    }
});


var Vacation = module.exports = mongoose.model('Vacation', VacationSchema);
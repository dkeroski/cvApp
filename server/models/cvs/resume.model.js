var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//MAIN SCHEMA MODEL
var ResumeSchema = new Schema({
    userId: String,
    basics: {
        firstName: String,
        lastName : String,
        jobPosition: String,
        email: String,
        phone: String,
        summary: String,
    },
    work: [{
        company: String,
        position: String,
        website: String,
        startDate: Date,
        endDate: Date,
        summary: String
    }],
    education: [{
        institution : String,
        studyType : String,
        startDate : Date,
        endDate : Date
    }],
    skills : [{
        name: String,
        level : Number
    }],
    languages : [{
        name: String,
        level : Number
    }]

});

var Resume = mongoose.model('Resume', ResumeSchema);

module.exports = Resume;
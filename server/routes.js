var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');


var jwt = require('jsonwebtoken');
var config = require('./config');

// configuration =========
var port = process.env.PORT || 8080;
db = mongoose.createConnection('mongodb://localhost/hr-portfolio');
app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    ectended: false
}));
app.use(bodyParser.json());



//use morgan to log requests to the console
app.use(morgan('dev'));

var _ = require('lodash');
var Resume = require('./models/cvs/resume.model.js');
var User = require('./models/users/user.model.js');
var Vacation = require('./models/vacations/vacation.model.js');
module.exports = function (app) {

    // Add headers
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    // User api's //

    // register new user 
    app.post('/registerUser', function (req, res) {
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        user.admin = req.body.admin;

        user.save(function (err, userID) {
            if (err) throw err;
            var token = jwt.sign(user, config.secret, {
                expiresIn: 1440
            });
            res.status(201).send({
                id_token: token,
                id_user: userID.id
            });
        });
    });

    // authenticate user

    app.post('/authenticateUser', function (req, res) {
        //find the user in db
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                //check if password mathches
                if (user.password != req.body.password) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 1440
                    });
                    res.status(201).send({
                        user: user,
                        token: token,
                        id_user: user._id
                    });
                }
            }
        });
    });
    var apiRoutes = express.Router();

    apiRoutes.use(function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decode token
        if (token) {
            jwt.verify(token, app.get('secret'), function (err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    // delete cv 
    app.delete('/deleteUser/:id', function (req, res) {
        User.findByIdAndRemove(req.params.id, function (err, res) {
            if (err) {
                res.json({
                    info: "User can not foind successfully",
                    erorr: err
                });
            }
            res.json({
                info: "User deleted successfully"
            });
        });
    });
    // get all users
    app.get('/allUsers', function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.json({
                    info: 'Error durring saving',
                    error: err
                })
            res.json({
                info: 'Users recived successfully',
                users: users
            })
        })
    });

    //get specific user
    app.get('/getUser/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err)
                res.json({
                    info: 'Error durring saving',
                    error: err
                })
            if (user) {
                res.json({
                    info: 'user found successfully',
                    data: user
                })
            } else {
                res.json({
                    info: 'user not found'
                })
            }
        })

    });

    app.use('/api', apiRoutes);

    // Cv api's //

    //get all cv's 
    app.get('/allCVs', function (req, res) {
        Resume.find(function (err, resumes) {
            if (err)
                res.json({
                    info: 'Error durring saving',
                    error: err
                })
            res.json({
                info: 'Cvs recived successfully',
                data: resumes
            })
        })
    });

    //get specific cv
    app.get('/getCv/:id', function (req, res) {
        Resume.findById(req.params.id, function (err, resume) {
            if (err)
                res.json({
                    info: 'Error durring saving',
                    error: err
                })
            if (resume) {
                res.json({
                    info: 'Cv found successfully',
                    data: resume
                })
            } else {
                res.json({
                    info: 'cv not found'
                })
            }
        })

    });

    //get cv for specific user 
    app.get('/getCvForUser/:id', function (req, res) {
        Resume.findOne({
            userId: req.params.id
        }, function (err, resume) {
            if (err) throw err;
            if (!resume) {
                res.json({
                    success: false,
                    message: 'Cvs not found.'
                });
            } else if (resume) {
                res.status(201).send({
                    cv: resume
                });
            }
        });
    });


    //save new Cv 

    app.post('/saveCv', function (req, res) {
        var resume = new Resume(req.body);
        console.log(req.body);
        // resume.basics.push({
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName
        // });
        resume.save(function (err) {
            if (err)
                res.json({
                    info: 'Error durring saving',
                    error: err
                })
        })
        res.json({
            info: "CV created successfully"
        })
    });

    //update cv 
    app.put('/editCv/:id', function (req, res) {
        Resume.findOneAndRemove({
            userId: req.params.id
        }, function (err, res) {
            if (err) {
                res.json({
                    info: "Cv can not foind successfully",
                    erorr: err
                });
            }
            Resume.findOne({
                userId: req.params.id
            }, function (err, resume) {
                if (err) {
                    console.log(err);
                } else {
                    var resume = new Resume(req.body);
                    resume.save(function (err) {
                        if (err) {
                            res.json({
                                info: 'Error durring saving',
                                error: err
                            })
                        }
                        
                    });
                }
            });
        });


    });

    // delete cv 
    app.delete('/deleteCv/:id', function (req, res) {
        Resume.findByIdAndRemove(req.params.id, function (err, res) {
            if (err) {
                res.json({
                    info: "Cv can not foind successfully",
                    erorr: err
                });
            }
            res.json({
                info: "Cv deleted successfully"
            });
        });
    });

    // Vacations APIs //

    //get all vacations
    app.get('/allVacations', function (req, res) {
        Vacation.find(function (err, vacations) {
            if (err)
                res.json({
                    info: 'Error durring saving',
                    error: err
                })
            res.json({
                info: 'Vacations recived successfully',
                data: vacations
            })
        })
    });

    // get specific vacation
    app.get('/getVacation/:id', function (req, res) {
        Vacation.findById(req.params.id, function (err, vacation) {
            if (err)
                res.json({
                    info: 'Error durring saving',
                    error: err
                })
            if (vacation) {
                res.json({
                    info: 'Vacation found successfully',
                    data: vacation
                })
            } else {
                res.json({
                    info: 'vacation not found'
                })
            }
        });
    });
    // get vacations for specific user
    app.get('/getVacationForUser/:id', function (req, res) {
        Vacation.find({
            userID: req.params.id
        }, function (err, vacations) {
            if (err) throw err;
            if (!vacations) {
                res.json({
                    success: false,
                    message: 'Vacations not found.'
                });
            } else if (vacations) {
                res.status(201).send({
                    vacations: vacations
                });
            }
        });
    });

    //send vacation
    app.post('/sendVacation', function (req, res) {
        var vacation = new Vacation(req.body);
        vacation.save(function (err) {
            if (err)
                res.json({
                    info: 'Error durring saving',
                    error: err
                })
        })
        res.json({
            info: "Vacation created successfully"
        })
    });

    // edit vacation (admin)
    app.put('/editVacation/:id', function (req, res) {
        Vacation.findById(req.params.id, function (err, vacation) {
            if (err) {
                res.json({
                    info: 'Vacation not found',
                    error: err
                });
            }
            if (vacation) {
                _.merge(vacation, req.body);
                vacation.save(function (err) {
                    if (err) {
                        res.json({
                            info: 'Error durring saving',
                            error: err
                        })
                    }
                    res.json({
                        data: req.vacation,
                        info: 'Vacation updated successfully'
                    })
                });
            } else {

                res.json({
                    info: 'Vacation not found'
                })
            }
        })
    });
}
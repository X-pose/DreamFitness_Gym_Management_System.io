//All the CRUDs related to login will be handled by this class


//Login basic functionalities are done. validations are not yet completed - completion -> 80%

const loginUser = require('../models/loginModel');
const adminUser = require('../models/AdminLoginModel');
const bcrypt = require('bcrypt');
const sessionHandler = require('../config/sessionHandler');


//get form data 
exports.login = async (req, res) => {
    try {

        const newLogin = new loginUser({
            userName: req.body.userName,
            psw: req.body.psw,

        });


        console.log(newLogin.userName, newLogin.psw);
        // Search for user in the database
        
        if (newLogin.userName == 'AdminUser') {
            
            const admin = await adminUser.findOne({userName:newLogin.userName})
            bcrypt.compare(newLogin.psw, admin.psw, (err, resu) => {

                if (err) {
                   
                } else {
                    
                    if (resu) {
                        
                        req.session.userName = admin.userName;
                        req.session.role = admin.role;
                        console.log('Session created for' + req.session.role);
                        sessionHandler.setSessionData(req.session.userName, req.sessionID);
                        res.cookie('sessionName', req.session.userName);
                        res.cookie('sessionId', req.sessionID);
                        res.cookie('sessionRole', req.session.role);

                        res.status(200).json('Admin')
                       
                    }else{
                        
                    }

                }
            })
        } else {

            const user = await loginUser.findOne({ userName: newLogin.userName });

            if (user) {
                // User found, compare passwords
                bcrypt.compare(newLogin.psw, user.psw, (err, result) => {

                    if (err) {

                    } else {

                        if (result) {
                            console.log(req.session);

                            // Assign the session data to req.session
                            req.session.userName = user.userName;

                            console.log('Session created for' + req.session.userName);
                            console.log('Session ID ' + req.session.ID);


                            sessionHandler.setSessionData(req.session.userName, req.sessionID);
                            res.cookie('sessionName', req.session.userName);
                            res.cookie('sessionId', req.sessionID);

                            res.status(200).json('Logged in succesfully!')



                        } else {
                            // Passwords don't match

                            res.status(403).json('Password did not match')
                        }
                    }

                });


            } else {
                // User not found
                res.status(403).json('User not found')

            }

        }


    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error at login');
    }

}


exports.logOut = async (req, res) => {
    sessionHandler.setSessionData(null, null)
    req.session.destroy();
    res.clearCookie('sessionId');
    console.log('User logged out successfully!')
    res.status(200).send('Logged out successfully! ');
}


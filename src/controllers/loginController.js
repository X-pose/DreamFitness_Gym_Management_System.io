//All the CRUDs related to login will be handled by this class


//Login basic functionalities are done. validations are not yet completed - completion -> 80%

const loginUser = require('../models/loginModel');
const bcrypt = require('bcrypt');
let sessionName;



//get form data 
exports.login = async(req,res)=>{
    try {
        
        const newLogin = new loginUser({
            userName:req.body.userName,
            psw:req.body.psw,

        });

        
        console.log(newLogin.userName, newLogin.psw);
        // Search for user in the database
        const user = await loginUser.findOne({ userName: newLogin.userName });

        if (user) {
            // User found, compare passwords
            bcrypt.compare(newLogin.psw, user.psw,(err,result)=>{

                if(err){
                    
                }else{

                    if (result) {
                        console.log(req.session);
                        console.log('Session ID ' + user._id);
                        // Assign the session data to req.session
                        req.session.userID = user._id;
                        req.session.userName = user.userName;
                        console.log('Session created for' + req.session.userName);
                        sessionName = req.session.userName;
                        res.cookie('sessionId', req.session.userID);
                        res.send('Logged in successfully!');
                        
                    } else {
                        // Passwords don't match
                        res.send('Password did not match');
                    }
                }
                
            });

            
        } else {
            // User not found
            res.send('User not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error at login');
    }
    
}

exports.sessionDetails = async() => {
    
    console.log('exporting session details : ' + sessionName) 
    return sessionName;
}

exports.logOut = async(req,res) =>{
    req.session.destroy();
    res.clearCookie('sessionId');
    res.send('Logged out successfully!');
}




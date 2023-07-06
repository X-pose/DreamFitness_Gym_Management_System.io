//CRUDs related to admin account will be handled by this class

const bcrypt = require('bcrypt');
const newUserAdded = require('../models/UserAddedNotifyModel')
const AdminAddNew = require('../models/AdminNewUser')
const saltCount = 10;

const hashPassswordGen = async(plainPsw) => {
    const hashPsw = await bcrypt.hash(plainPsw, saltCount);
    return hashPsw;

};

exports.addNewAdmin = async(req,res) =>{
    try {

        
        const hashedPassword = await hashPassswordGen(req.body.adminPsw);
        const newAdmin = new AdminAddNew(
            {
                role : req.body.adminrole,
                userName: req.body.adminUserName,
                psw:hashedPassword 
            }
        )

        
        const addedAdmin = await newAdmin.save()
        res.status(201).json(addedAdmin);

    } catch (error) {
        res.status(400).json({error:error.message})
        console.log("Error in admin assignment")
    }
}


exports.searchUserAccounts = async(req,res) =>{
    try {
    
        const results = await newUserAdded.find({});
        console.log(results)
        res.status(201).json(results.reverse());

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error at searchUserAccount method' })
    }
}
//CRUDs related to admin account will be handled by this class


const newUserAdded = require('../models/UserAddedNotifyModel')



exports.searchUserAccounts = async(req,res) =>{
    try {
    
        const results = await newUserAdded.find({});
        console.log(results)
        res.status(201).json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error at searchUserAccount method' })
    }
}
//All the admin related requests will be handles from this class
const express = require('express')
const router = express.Router()
const adminAccount = require('../controllers/adminAccountController');


router.get('/api/getAddedUsers', (req,res)=>{
    adminAccount.searchUserAccounts(req,res);
  })

  
//Exports Router
module.exports = router;
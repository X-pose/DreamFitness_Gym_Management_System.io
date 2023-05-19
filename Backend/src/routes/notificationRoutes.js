//All the request from workout schduler system will be handled by here

const express = require('express')
const router = express.Router()
const notfyRoutes = require('../controllers/NotificationsController');



//Upon sending new notification
router.post('/api/createNotfy',(req,res) => {
    notfyRoutes.sendNotify(req,res);
})



//Get user notification
router.get('/api/getNotify', (req,res)=>{
    notfyRoutes.showNotify(req,res);
  })

  //Get admin notification
router.get('/api/adminNotify',(req,res)=>{
  notfyRoutes.adminShowNotify(req,res);
})


//Exports Router
module.exports = router;

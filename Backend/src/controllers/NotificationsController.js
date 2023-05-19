const notfy = require('../models/notificationModel')
const sessionHandler = require('../config/sessionHandler');
const newUserAdded = require('../models/UserAddedNotifyModel')
const currentDate = new Date()

exports.sendNotify = async(req,res)=>{
    try {
        
        const newNotfy = new notfy({
            Destination: req.body.Destination,
            Title:req.body.Title,
            Description:req.body.Description,
            Date:currentDate.toISOString().slice(0, 10),
        })

        const savedNotfy = await newNotfy.save();
        res.status(200).json(savedNotfy)
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Server error at NotificationController.sendNotify()' });
    }
}

exports.showNotify = async (req, res) => {
    try {
      const sessionName = sessionHandler.getSessionName();
  
      const getPersonalNotify = notfy.find({ Destination: sessionName });
      console.log('passing alpha ' + sessionName);
      const getGlobalNotify = notfy.find({ Destination: 'All' });
  
      const [personalNotify, globalNotify] = await Promise.all([
        getPersonalNotify,
        getGlobalNotify,
      ]);
  
      const notifyArray = [personalNotify, globalNotify].filter(Boolean);
  
      if (notifyArray.length === 0) {
        res.status(404).json({ error: 'No notifications found' });
      } else {
        res.status(200).json(notifyArray);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error at NotificationController.showNotify()' });
    }
  };
  
  

exports.adminShowNotify = async(req,res)=>{
    let adminNotifyArray = []

    adminNotifyArray = await notfy.find({});
    res.status(201).json(adminNotifyArray);
}

exports.newUserAdded = async(req)=>{
    try {
        console.log('Passing alpha')
        console.log(req)
        const newAdded = new newUserAdded({
            proPic:req.proPic,
            userID:req.userID,
            userName:req.userName,
            addedDate:req.accountCreatedDate,
          });
          console.log('Passing bravo')
         try {
            console.log('Passing charile')
            const savedUser = await newAdded.save()
            console.log('Passing Delta')
         } catch (err) {
            console.log('Error in newUserAdded at Notify-save')
         }
          
        
    } catch (error) {
        console.log('Error in newUserAdded at Notify-newUserAdded')
    }
}

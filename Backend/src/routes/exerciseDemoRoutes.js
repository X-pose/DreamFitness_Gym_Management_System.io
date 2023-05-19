//All the request from workout schduler system will be handled by here

const express = require('express')
const router = express.Router()
const multer  = require('multer');
const exerciseDemoController = require('../controllers/exerciseDemoController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/img')
    },
  
    filename: function (req, file, cb) {
      const imgName =  req.body.wName + '_exercice.gif';
      cb(null,  imgName)
    }
    
  })
  
  const upload = multer({ storage: storage });
   


//Create exercise 
router.post('/api/createExercise', upload.single('wGifSource'), (req,res) =>{
    exerciseDemoController.createExercise(req,res);
})

//Read exercise
router.get('/api/readExercise', (req,res) => {
    exerciseDemoController.getExercise(req,res);
})

//Upon requesting update exercise
router.post('/api/updateExercise',upload.single('wGifSource'),(req,res) => {
    exerciseDemoController.updateExercise(req,res);
})

//Upon requesting delete exercise
router.delete('/api/deleteExercise',(req,res)=>{
    exerciseDemoController.deleteExercise(req,res);
})

//Search query
router.get('/api/searchExercise', (req,res)=>{
  exerciseDemoController.searchExercise(req,res);
})

//Exports Router
module.exports = router;

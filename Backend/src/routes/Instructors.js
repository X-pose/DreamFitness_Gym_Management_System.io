const express = require('express')
const multer  = require('multer');
const { 
    getInstructors,
     getInstructor,
     createInstructor,
     deleteInstructor,
    updateInstructor,
} = require('../controllers/InstructorController')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/img')
    },
  
    filename: function (req, file, cb) {
      const imgName =  req.body.title + '_Display.png';
      console.log('Multer running okay')
      cb(null,  imgName)
    }
    
  })
  
  const upload = multer({ storage: storage });


const router = express.Router()

//get all instructors
router.get('/', getInstructors)

 
//get a single instructors
router.get('/:id', getInstructor)
  

//post a new instructors

router.post('/',upload.single('displayImg'), createInstructor)

//delete a new instructors

router.delete('/:id',deleteInstructor)
  

//update a new instructors 

router.put('/:id',upload.single('displayImg'), updateInstructor)

module .exports = router;

const express = require('express')


const{ createDietPlan,
    getDietPlan,
    getDietPlans,
    deleteDietPlan,
    updateDietPlan
} = require('../controllers/dietPlanController')



const router = express.Router()

router.get('/',getDietPlans)



router.get('/:id', getDietPlan)


router.post('/', createDietPlan)

router.delete('/:id',deleteDietPlan)


router.put('/:id',updateDietPlan)



module.exports = router
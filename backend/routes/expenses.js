const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const Expenses = require('../models/Expenses')


// route 1 : fetchall user details on api/notes/fetchalldetails
router.post('/fetchalldetails', fetchuser, async (req, res) => {
    const expenses = await Expenses.find({ user: req.user.data.id });
   return res.json(expenses)
})



router.post(
    '/addExpenses' , [
        body('travel').isFloat({gt :0}) ,
        body('rent').isFloat({gt :0}) ,
        body('education').isFloat({gt :0}) ,
        body('other').isFloat({gt :0}) ,
        body('food').isFloat({gt :0}) 

    ] , fetchuser ,async (req , res) =>{

        const { travel, education, food , rent , other } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

           let addExpenses = new Expenses();
           addExpenses.travel = travel;
           addExpenses.rent = rent;
           addExpenses.food = food;
           addExpenses.education = education;
           addExpenses.other = other;
           addExpenses.user = req.user.data.id;

           let saveExpenses = await addExpenses.save();
           res.json(saveExpenses)
    }
)


module.exports = router;
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')



const JWT_SECRET = "saymynamebharat"
//   Route 1 - api to api/auth/createuser
router.post('/createuser',
    // check validation usring express validator 
    [body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
    ],
    // this is callback function
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        let user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.status(400).json({ "error": "sorry a user with this email is already exist" });
        }


        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        // create the new user 

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        }).then((user) => {


            const data = {
                data: {
                    id: user.id
                }

            }

            // create the jwet token for verfiy the user after the login after this authtoken we not need to send everytime the password
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken })


        }).catch((err) => {
            console.log(err)
            res.json({ message: "please enter the unique email id" })
        });


    })




//  Route 2- authenticate the user with /api/auth/login

router.post('/login',
    // check validation usring express validator 
    [body('email').isEmail(),
    body('password').exists()
    ],

    async (req, res) => {

        let success = false;
        let user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(400).json({ success, "error": "please enter the correct credentials" });
        }

        const { email, password } = req.body;


        try {

            let user = await User.findOne({ email });

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res.status(400).json({success, "error": "please enter the correct credentials" });
            }


            const data = {
                data: {
                    id: user.id
                }

            }

            // create the jwet token for verfiy the user after the login after this authtoken we not need to send everytime the password
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success , authtoken })

        }catch(err){
            console.log(err)
            res.json({ success , message: "internal server errors" })
        }

    })



    // route 3: get the details of user api/auth/getuser

    router.post('/getuser', fetchuser,  async (req, res) => {


        try {
            
             userid = req.user.data.id;
            const user_data = await User.findById(userid).select('-password');
            res.send(user_data);

        } catch(err){
            console.log(err)
            res.json({ message: "internal server errors" })
        }
        }
    )

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const {
    check,
    validationResult
} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// A test Route for frontend 
// route GET api/auth
// access public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.status(200).json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false
        })
    }
})

// route GET api/auth
// access public
router.get('/users', async (req, res) => {
    try {
        const user = await User.find().select('-password')
        res.status(200).json({
            user
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false
        })
    }
})

// access Public
// login user
// route POST api/auth
router.post('/', [
        check('email', 'Please add a valid email').isEmail(),
        check('password', "Enter a valid password").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        let {
            password,
            email
        } = req.body
        try {
            // Steps:
            // See if user exists
            let user = await User.findOne({
                email
            });

            if (!user) {
                return res.status(400).json({
                    errors: [{
                        msg: "Invalid credenials"
                    }]
                })
            }

            // compare password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{
                        msg: "Invalid credenials"
                    }]
                })
            }

            // Return jwt
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600000
            }, (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({
                success: false
            })
        }
    });

module.exports = router
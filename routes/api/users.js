const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator')
const User = require('../../models/User');
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// access Public
// Registerr user
// route POST api/users
router.post('/', [check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please add a valid email').isEmail(),
        check('password', "Enter a valid password").isLength({
            min: 6
        })
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
            name,
            password,
            email
        } = req.body
        try {
            // Steps:
            // See if user exists
            let user = await User.findOne({
                email
            });

            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: "user already exists"
                    }]
                })
            }
            // Get users gravatar

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            user = await User.create({
                name,
                email,
                password,
                avatar
            })

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
    })

module.exports = router;
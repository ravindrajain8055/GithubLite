const express = require('express');
const router = express.Router();

// access Public
// route GET api/users
router.get('/', (req, res) => res.send('user route'))

module.exports = router;
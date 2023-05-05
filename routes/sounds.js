const express = require('express');
const router = express.Router();
const Sound = require('../models/sound');

router.get('/', (req, res) => {
    try {
        const sounds = Sound.find();
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
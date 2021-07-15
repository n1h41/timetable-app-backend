const router = require("express").Router();
const User = require("../models/user");
const TimetableData = require("../models/timetableData");

router.get('/user/list', async (req, res) => {
    try {
        const allUsers = await User.find()
        res.send(allUsers)
    } catch (error) {
        res.send(error)
    }
})

router.get('/user/entries', async (req, res) => {
    try {
        const allEntries = await TimetableData.find({userId: req.query.id})
        res.send(allEntries)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
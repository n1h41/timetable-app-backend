const router = require("express").Router();
const User = require("../models/user");
const TimetableData = require("../models/timetableData");
const jwtAuth = require('../middlewares/jwtAuthentication')

router.post("/entry/add", jwtAuth, async (req, res) => {
  const timetableData = new TimetableData(req.body)
  timetableData.userId = req.user._id
  try {
      const savedTimetableData = await timetableData.save()
      return res.send(savedTimetableData)
  } catch (error) {
      return res.send(error)
  }
});

router.delete("/entry/delete", jwtAuth, async (req, res) => {
    try {
        const data = await TimetableData.findByIdAndDelete(req.query.id)
        res.send(data)
    } catch (error) {
        return res.status(400).send(error)
    }
})

router.get("/entry/view/all", jwtAuth, async (req, res) => {
    /* console.log(req.user.email) */
    try {
        const entryData = await TimetableData.find({userId: req.user._id})
        return res.send(entryData)
    } catch (error) {
        return res.send(error)
    }
})

module.exports = router;

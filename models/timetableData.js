const mongoose = require('mongoose')
const User = require('./user')

const timetableDataSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 255
    },
    isLunchBreak: {
        type: Boolean,
        required: true
    },
    selectedDays: [
        {
            type: String,
            min: 3,
            max: 4
        }
    ],
    fromTime: {
        type: Date,
        required: true,
    },
    toTime: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
})

module.exports = mongoose.model('TimetableData', timetableDataSchema)
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    class: {
        type: Number,
        max: 12
    },
    section: {
        type: String,
        minLength: 1,
        maxLength: 2
    },
    role: {
        type: String,
        required: true,
        min: 3,
        max: 8,
    },
})

module.exports = mongoose.model('User', userSchema)
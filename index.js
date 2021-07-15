const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const authRoute = require('./routes/authentication')
const homeRoute = require('./routes/home')
const adminRoute = require('./routes/admin')

dotenv.config()

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('DB Connected Successfully')
    }
    catch (err) {
        console.log(err)
    }
}   

ConnectDB()

app.use(express.json({ extended: false}))

app.use('/authentication', authRoute)
app.use('/home', homeRoute)
app.use('/admin', adminRoute)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running at http://127.0.0.1:3000')
})
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const port = 4003;
const Users = require('./mongoose')
const auth = require('./auth')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('<h1>This is home page!!!!</h1>')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/index2.html')
})

app.post('/login', (req, res) => {
    let token = jwt.sign({ _id: req.body._id }, process.env.SECRET_KEY)

    res.cookie('jwttoken',token,{
        httpOnly : true
    })

    const user = new Users({
        Email: req.body.email,
        Mobile_Number: req.body.mobile,
        Password: req.body.password,
        tokens: token
    })
    user.save()

        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/contact', auth, (req, res) => {
    res.send('<h1>Contact Page!!!</h1>')
})

app.listen(port, () => {
    console.log(`Server is listining on port : ${port}`)
})


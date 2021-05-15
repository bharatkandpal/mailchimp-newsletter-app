const express = require('express')
const request = require('request')

const app = express()
app.use(express.static("./"))
app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/signup', (req, res) => {
    const fName = req.body.fname
    const lName = req.body.lname
    const eMail = req.body.email
    console.log(req.body);
    res.status(201).send(fName+" "+lName+" "+eMail+" ")
})

app.listen(3005, () => {
    console.log("listening on port 3005");
})



const express = require('express')
const request = require('request')
const https = require('https')

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

    const data = {
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]

    }
    const jsonData = JSON.stringify(data)
    // API KEY
    // mailchimp
    const key = 'aabc85ceac713cc70247937f1f6bbc18-us1'
    // list_id
    const list_id = 'd72cd954b9'
    const url = 'https://us1.api.mailchimp.com/3.0/lists/'+list_id
    const options = {
        method: "POST",
        auth:"bk:aabc85ceac713cc70247937f1f6bbc18-us1"

    }
    const request = https.request(url, options, (resp) => {
        console.log(resp.statusCode)
        if(resp.statusCode==200)
            res.sendFile(__dirname+"\\success.html")
        else
            res.sendFile(__dirname+"\\failure.html")

        
        resp.on("data",(data)=>{
            console.log(JSON.parse(data))
        })

    })
    request.write(jsonData)
    request.end()
})

app.post("/failure",(req,res)=>{
    res.redirect("/home")
})

app.listen(3005, () => {
    console.log("listening on port 3005");
})



// https://${dc}.api.mailchimp.com/3.0/lists \
//   --user "anystring:${apikey}"' \
//   -d '{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"visibility":"pub","double_optin":false,"marketing_permissions":false}'

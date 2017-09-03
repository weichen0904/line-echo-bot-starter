let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let app = express()

const CHANNEL_ACCESS_TOKEN = 'yKjBWv12cuQ5y4w95kyPb3UIREIo8ydy4MZJgKyNj4IkqAQDUUV63Hv1RCvlPcwi2nifrPgtWDzRGIu6jWufJtrspBbq1Zg8UK7ZOe5MaGZpitkNHZgkIMq8pOHccU54d00EfjcGeN1Y658qHbqF5wdB04t89/1O/w1cDnyilFU='
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})

// handler receiving messages
app.post('/', function (req, res) {
    console.log(req.body);
    res.send(); 
})

// generic function sending messages
function sendMessage(replyToken, text) {
    let body = {
        replyToken,
        messages: [{
            type: 'text',
            text,
        }],
    };

    let options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
        body,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    })
}

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
    console.log(JSON.stringify(req.body,null,2));
     // 記錄下來對方傳來的log,利用 JSON.stringify(__,null,2) 把對方寫的文字顯示出來
    
    //應聲蟲模式
     let replyToken=req.body.events[0].replyToken;
     let  text=req.body.events[0].message.text;
     if (text){
         sendMessage(replyToken,text);

     }

    res.send(); //回傳給line空值
})

// generic function sending messages 回傳內容
function sendMessage(replyToken, text) {
    let body = {
        replyToken:replyToken,
        messages: [{
            type: 'text',
            text:text,
        }],
    };

    let options = {
        url: 'https://api.line.me/v2/bot/message/reply', //line API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,//認證
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

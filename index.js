var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var messageParser = require('./message-parser')
const axios = require('axios')
const helpMessage = '/help for this message...'

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.post('/new-message', function(req, res) {
  const { message } = req.body

  if (!message) {
    return res.end()
  }

  var parsedMessage = messageParser(message);

  try {
    const response = await axios
      .post(
        'https://api.telegram.org/bot<your_api_token>/sendMessage',
        {
          chat_id: message.chat.id,
          text: helpMessage
        }
      );
  } catch (error) {
    console.log('Error :', error)
    res.end('Error :' + error)
  }
  console.log('Message posted')
  res.end('ok')
})

app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})

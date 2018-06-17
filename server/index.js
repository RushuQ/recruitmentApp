const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./router/user')
const Chat = require('./model/chat')
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/jobChat'
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function () {
  console.log('the mongodb connects successfully')
})
const server = require('http').Server(app);
const io = require('socket.io')(server);
// Chat.remove({},function (err,doc) {
//   console.log('刪除')
// })
io.on('connection',function (socket) {
  socket.on('sendMsg',function (data) {
    const create_time = new Date().getTime()
    const {content,from,to} = data;
    const chatid = [from,to].sort().join('_');
    Chat.create({content,from,to,chatid,create_time},function (err,doc) {
      io.emit('chatMsg',doc)
    })
  })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

app.all('*', function(req, res, next) {
  // CORS配置
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials",true)
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use('/user',userRouter);

server.listen(9292,function (req,res) {
  console.log('the server is000 starting...')
})
module.exports = app;

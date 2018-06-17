const express = require('express');
const router = express.Router();
const User = require('../model/user')
const Chat = require('../model/chat')
const _filter = {'__v': 0, 'pwd': 0}
// User.remove({},function (err,doc) {
//   console.log('刪除')
// })
router.get('/allUSer', function (req, res) {
  User.find({}, function (err, doc) {
    if (err) {
      return res.json({
        code: 0,
        msg: err
      })
    }
    return res.json({
      code: 1,
      data: doc
    })
  })
})
router.post('/loginUser', function (req, res) {
  const {username, pwd} = req.body;
  User.findOne({username, pwd}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '账号或密码错误'
      })
    }
    res.cookie('userid', doc._id,{
      path:'/',
      maxAge:1000*60*60
    })
    return res.json({
      code: 0,
      data: doc
    })
  })
})
router.post('/registerUser', function (req, res) {
  const {username, pwd, type} = req.body;
  User.findOne({username}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '该用户名已存在！'})
    }
    const userModel = new User({username, pwd, type});
    userModel.save(function (error, data) {
      if (error) {
        return res.json({code: 1, msg: '出错了！'});
      }
      res.cookie('userid', data._id);
      res.json({
        code: 0,
        data: {username, type}
      })
    })
  })
})
router.post('/updateUserMsg', function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({
      code: 1
    })
  }
  const body = req.body

  User.findByIdAndUpdate(userid, body, function (err, doc) {

    const data = Object.assign({}, {
      user: doc.username,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})
router.get('/getChatList',function (req,res) {
  const {id} = req.query;
  const userid = req.cookies.userid;
  const chatid = [id,userid].sort().join('_')
  console.log([chatid,'11111111'])
  Chat.find({chatid}, _filter,function (err,doc) {
    if(!doc){
      return res.json({
        code: 1
      })
    }
    return res.json({
      code: 0,
      data: doc
    })
  })
})
//获取相对身份列表
router.get('/typeList',function (req,res) {
  const {type} = req.query;
  const userid = req.cookies.userid;
  if(!userid){
    return res.json({
      code: 1,
      msg: '请先登录'
    })
  }
  User.find({type}, function (err, doc) {
    return res.json({
      code: 0,
      data: doc
    })
  })
})
router.post('/updateRead',function (req,res) {
  const to = req.cookies.userid;
  const {from} = req.body;
  Chat.update({from,to},{read:true},{'multi':true},function (err,doc) {
    //console.log(doc)
    if(!err){
      return res.json({code:0,num:doc.nModified})
    }
    return res.json({
      code:1,
      msg: '修改失败!'
    })
  })
})
router.get('/unReadNum',function (req,res) {
  const to = req.cookies.userid;
  if(!to){
    return res.json({
      code:1
    });
  }
  Chat.find({read:false,to},function (err,doc) {
    if(!err){
      return res.json({code:0,num:doc.length})
    }
  })
})
router.get('/getmsglist',function (req,res) {
  const user = req.cookies.userid;
  User.find({},function (error,users) {
    Chat.find({'$or':[{from:user},{to:user}]},function (err, doc) {
      if (!err) {
        var datas = formatData(doc,user);
        return res.json({
          code: 0,
          msg: datas
        })
      }
    })
  })
})

module.exports = router;
/*
* 按照聊天用户处理数据，
* userInfos为当前登录用户与聊天对象的消息列表
* count为未读消息数量
* */
function formatData(chats,userid) {
  var users = {}
  chats.map(v => {
    const chatid = v.chatid.split('_');
    chatid.splice(chatid.findIndex(item => item === userid), 1)
    if (!users[chatid[0]]) {
      users[chatid[0]] = {
        userInfos: [],
        count:0
      }
    }
    if (!v.read && v.from != userid) {
      users[chatid[0]].count += 1;
    }
    users[chatid[0]].userInfos.push(v)
  })
  return formatSortData(users);
}
//按照消息的时间排序并截取最后一条
function formatSortData(list) {
  Object.values(list).map(v=>{
    const news = Object.values(v)
    news.sort(function(val1,val2){
        return val2.create_time - val1.create_time
      })
    v.userInfos = v.userInfos.pop()
  })
  return list;
}

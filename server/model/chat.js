const mongoose = require('mongoose');
const chat = new mongoose.Schema({
  'from': {
    'type': String,
    'require': true
  },
  'to': {
    'type': String,
    'require': true
  },
  'content': {
    'type': String,
    'require': true,
    'default': ''
  },
  'create_time': {
    'type': String,
    'default': new Date().getTime()
  },
  'chatid': {
    'type': String,
    'require': true
  },
  'read': {
    'type': Boolean,
    'default': false
  }
})
module.exports = mongoose.model('Chat',chat)

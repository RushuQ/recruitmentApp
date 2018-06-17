const mongoose = require('mongoose');
const user = new mongoose.Schema({
  'username':String,
  'pwd':String,
  'type':String,
  'avator':String,
  'money':String,
  'company':String,
  'desc':String,
  'aspect':String,
  'title':String,
  'create_time': {
    'type': String,
    'default': new Date().getTime()
  }
})
module.exports = mongoose.model('User',user);

var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
  name:String,
  date: {type:Date, default:Date.now},
  action:String,
  note: String
});

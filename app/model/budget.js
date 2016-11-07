var mongoose = require('mongoose');

module.exports= mongoose.model('Budget',
{
  month: {type:Date},
  income: Number,
  expense: Number,
  balances: Number,
  bud: Number
});

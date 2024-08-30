const mongoose = require('mongoose')
const { Schema } = mongoose;

const ExpensesSchema = new Schema({

   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },
   travel: {
      type: Number,
      required: true
   },
   food: {
      type: Number,
      required: true

   },
   rent: {
      type: Number,
      required: true
   },

   education: {
      type: Number,
      required: true
   },

   other: {
      type: Number,
      default: 0
   },
   timestemp: {
      type: Date,
      default: Date.now
   }
});


module.exports = mongoose.model('expenses', ExpensesSchema);
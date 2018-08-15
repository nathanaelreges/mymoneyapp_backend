const restful = require('node-restful')
const mongoose = restful.mongoose

const creditSchema = new mongoose.Schema({
   name: {type: String, required: true},
   value: {type: Number, min: 0, required: true}
})


const debitSchema = new mongoose.Schema({
   name: {type: String, required: true},
   state: {type: String, uppercase: true, enum: ['PENDENTE', 'PAGO', 'AGENDADO']},
   value: {type: Number, min: 0, required: true}
})


const billingSchema = new mongoose.Schema({
   name: {type: String, required: true},
   month: {type: Number, required: true, min: 1, max: 12},
   year: {type: Number, required: true, min: 1970, max: 2100},
   credits: [creditSchema],
   debits: [debitSchema]
})

module.exports = restful.model('BilligCycle', billingSchema)
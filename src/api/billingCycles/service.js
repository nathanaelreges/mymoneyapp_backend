const BillingCycle = require('./model')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, applyValidators: true})

module.exports = BillingCycle




const billingCycle = require('./model')

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({new: true, applyValidators: true})

billingCycle.route('count', (req, res, next) => {
   billingCycle.estimatedDocumentCount({}, (err, result)=>{
      res.json({result})
   })
})



module.exports = billingCycle




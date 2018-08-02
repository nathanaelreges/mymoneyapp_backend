const billingCycle = require('./model')

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({new: true, applyValidators: true})

billingCycle.route('count', (req, res, next) => {
   billingCycle.estimatedDocumentCount({}, (err, result)=>{
      res.json({result})
   })
})

billingCycle.route('summary', (req, res, next) => {
   billingCycle.aggregate([{
      $project: {credits: {$sum: '$credits.value'}, debits: {$sum: '$debits.value'}}
   },{
      $group: {_id: null, credits: {$sum: '$credits'}, debits: {$sum: '$debits'}}
   },{
      $project: {_id: 0, credits: 1, debits: 1}
   }])
      .then((result)=>{
         res.json(result)
      })
})

module.exports = billingCycle




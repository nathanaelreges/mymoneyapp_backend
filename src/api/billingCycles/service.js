const billingCycle = require('./model')
const errorHandler = require('../common/errorHandler')

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({new: true, runValidators: true})


billingCycle.after('put', errorHandler).after('post', errorHandler)

billingCycle.route('count', (req, res, next) => {
   billingCycle.estimatedDocumentCount({}, (err, result)=>{
      if(err) {
         res.status(500).send({erros: [err]})
      }
      else {
         res.send({result})
      }
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
      .then(result=>{
         res.send(result[0] || {credits: 0, debits: 0})
      })
      .catch(err=>{
         res.status(500).send({erros: [err]})
      })
})

module.exports = billingCycle




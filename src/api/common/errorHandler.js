const _ = require('lodash')

module.exports = (req, res, next)=>{
   const errors = res.locals.bundle.errors
   if(errors){
      const erros = []
      _.forIn(errors, obj=>{
         erros.push(obj.message)
      })
      res.status(400).send({erros})
   }
}
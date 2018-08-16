const jwt = require('jsonwebtoken')
const secret = require('../.env').authSecret

module.exports = (req, res, next)=>{
   if(req.method === 'OPTIONS'){
      return next()
   }

   const token = req.body.token || req.query.token || req.headers['authorization']

   if(!token){
      res.status(403).json({errors: ['Token não fornecido.']})
   }

   jwt.verify(token, secret, (err, decoded)=>{
      if(err) {
         res.status(403).json({errors: ['Token de autenticação invalido.']})
      }
      else {
         //res.decoded = decoded
         next()
      }
   
   })
}
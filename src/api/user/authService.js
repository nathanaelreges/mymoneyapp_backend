const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./userModel')
const secret = require('../../.env').authSecret
const _ = require('lodash')



const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const sendDBerrors = (res, dbErrors) => {
   const errors = []
   _.forIn(dbErrors.errors, error => errors.push(error.message))
   return res.status(400).send({ errors })
}



const login = (req, res, next) => {
   const email = req.body.email || ''
   const password = req.body.password || ''

   User.findOne({ email }, async function (err, user) {
      if(err){ return sendDBerrors(res, err) }
      
      if(!user) { return res.status(400).send({errors: ['Senha/Usuário invalidos.']}) }

      const match = await bcrypt.compare(password, user.password)

      if(!match) { return res.status(400).send({errors: ['Senha/Usuário invalidos.']}) }

      const { name, email } = user
      const token = jwt.sign({ name, email }, secret, {expiresIn: '3 days'})
      
      return res.status(200).json({ token, name, email })
      
      
   })
}


const validateToken = (req, res, next) => {
   const token = req.body.token || ''

   jwt.verify(token, secret, (err, decoded)=>{
      return res.status(200).json({ valid: !err })
   })
}


const sign = async function (req, res, next) {
   const name = req.body.name || ''
   const email = req.body.email || ''
   const password = req.body.password || ''
   const confirmPassword = req.body.confirmPassword || ''

   if(!email.match(emailRegex)){
      return res.status(400).send({errors: ['O e-mail informado está inválido.']})
   }

   /*if(!password.match(passwordRegex)){
      res.status(400).send({errors: ['Senha precisar ter: uma letra maiúscula, uma letra minúscula, ' +
      'um número, uma caractere especial(@#$ %) e tamanho entre 6-20.']})
   }*/

   if(password.length < 4){
      res.status(400).send({errors: ['Senha precisar ter: uma letra maiúscula, uma letra minúscula, ' +
      'um número, uma caractere especial(@#$ %) e tamanho entre 6-20.']})
   }

   User.findOne({ email }, async function (err, user) {
      if(err){
         return sendDBerrors(res, err)
      }
      
      if(user) {
         return res.status(400).send({errors: ['Usuário já cadastrado.']})
      }
      
      const passwordHash = await bcrypt.hash(password, 3)
      const match = await bcrypt.compare(confirmPassword, passwordHash)
      
      if(!match) {
         return res.status(400).send({errors: ['Confirmação de senha invalida.']})
         
      }
      
      const newUser = new User({name, email, password: passwordHash})
      newUser.save(err => {
         if(err) {
            return sendDBerrors(res, err)
         }
         else{
            login(req, res, next)
         }
      })
      

   })

}


module.exports = { login, sign, validateToken }


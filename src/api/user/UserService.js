const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./UserModel')
const secret = require('../../.env').authSecret



const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const sendDBerrors = (res, dbErrors) => {
   const errors = dbErrors.map(error => (error.message))
   res.status(400).json({ errors })
}



const login = (req, res, next) => {
   const email = req.body.email || ''
   const password = req.body.password || ''

   User.findOne({ email }, (err, user)=>{
      if(err){
         sendDBerrors(res, err)
      }
      else
      if(user) {
         bcrypt.compare(password, user.password).then((err, res)=>{
            if(res) {
               jwt.sign(user, secret, {expiresIn: '3 days'}, (err, token)=>{
                  const { name, email } = user
                  res.status(200).json({ token, name, email })
               })
            }
            else {
               res.json({errors: ['Senha/Usuário invalidos.']})
            }
         })
      }
      else {
         res.json({errors: ['Senha/Usuário invalidos.']})
      }
   })
}


const validateToken = (res, req, next) => {
   const token = req.body.token || ''

   jwt.verify(token, secret, (err, decoded)=>{
      res.status(200).json({ valid: !err })
   })

   /*jwt.verify(token, secret, (err, decoded)=>{
      if(decoded) {
         res.body.user = decoded
         res.status(200).send()
      }
      else {
         res.status(400).json({errors: ['Token de autenticação invalido.']})
      }
   })*/
}


const sign = async function (res, req, next) {
   const user = req.body.user || ''
   const email = req.body.email || ''
   const password = req.body.password || ''
   const confirmPassword = req.body.confirmPassword || ''

   if(!email.match(emailRegex)){
      res.status(400).send({errors: ['O e-mail informado está inválido.']})
   }

   if(!password.match(passwordRegex)){
      res.status(400).send({errors: ['Senha precisar ter: uma letra maiúscula, uma letra minúscula, ' +
      'um número, uma caractere especial(@#$ %) e tamanho entre 6-20.']})
   }

   User.findOne({ user }, (err, user)=>{
      if(err){
         sendDBerrors(res, err)
      }
      else
      if(user) {
         res.json({errors: ['Usuário já cadastrado.']})
      }
      else {
         const passwordHash = await bcrypt.hash(password)
         const match = bcrypt.compare(confirmPassword, passwordHash)
         
         if(!match) {
            res.json({errors: ['Confirmação de senha invalida.']})
            return
         }
         
         const newUser = new User({user, email, password: passwordHash})
         newUser.save(err => {
            if(err) {
               sendDBerrors(res, err)
            }
            else{
               login(res, req, next)
            }
         })
         
         
         
      }
   })

}


module.exports = { login, sign, validateToken }


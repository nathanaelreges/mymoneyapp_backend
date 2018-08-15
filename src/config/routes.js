const express = require('express')
const billingCycle = require('../api/billingCycles/bCService')
const authService = require('./auth')
const user = require('../api/user/authService')

module.exports = (server) => {

   /*
    * Protected API
   */
   const protectedRouter = express.Router()
   server.use('/api', protectedRouter)

   protectedRouter.use(authService)
   billingCycle.register(protectedRouter, '/billingcycles')

   /*
    * Open API
   */
   const openRouter = express.Router()
   server.use('/oapi', openRouter)

   openRouter.post('/login', user.login)
   openRouter.post('/sign', user.sign)
   openRouter.post('/validateToken', user.validateToken)
}
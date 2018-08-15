const express = require('express')
const billingCycle = require('../api/billingCycles/bCService')

module.exports = (server) => {

   const router = express.Router()
   server.use('/api', router)

   billingCycle.register(router, '/billingcycles')
   
}
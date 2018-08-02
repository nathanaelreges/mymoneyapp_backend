const port = 3003

const express = require('express')
const bodyParser = require('body-parser')

const server = express()
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


server.listen(port, ()=>{
   console.log('BACKEND listening at ' + port)
})

const server = require('./loaders/server')
require('./loaders/database')
require('./loaders/routes')(server)
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/billingcycle', {useNewUrlParser: true })
mongoose.Promise = global.Promise



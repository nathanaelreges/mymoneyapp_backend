const restful = require('node-restful')
const mongoose = restful.mongoose


const UserSchema = new mongoose.Schema({
   name: {type: String, required: true},
   password: {type: String, required: true},
   email: {type: String, required: true}
}) 

module.exports = restful.model('user', UserSchema)
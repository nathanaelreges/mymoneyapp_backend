const restful = require('node-restful')
const mongoose = restful.mongoose


const UserSchema = new mongoose.Schema({
   name: {type: String, required: true},
   password: {type: String, required: true, min: 6, max: 24},
   email: {type: String, required: true}
}) 



module.exports = restful.model('user', UserSchema)
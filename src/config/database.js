const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/billingcycle', {useNewUrlParser: true })
mongoose.Promise = global.Promise


mongoose.Error.messages.general.required = 'O campo "{PATH}" precisa ser preenchido.'
mongoose.Error.messages.Number.min = 'O valor "{VALUE}" informado é menor que o limite mínimo de "{MIN}" para o campo "{PATH}"'
mongoose.Error.messages.Number.max = 'O valor "{VALUE}" informado é maior que o limite máximo de "{MIN}" para o campo "{PATH}"'
mongoose.Error.messages.String.enum = 'O valor "{VALUE}" não é válido para o atributo "{PATH}"'
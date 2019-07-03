// models/Tshirt.js
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const tshirtSchema = new Schema({
  name: String,
  pictureUrl: Schema.Types.String,
  price: { 
    type: Number,
    min: 0
  },
  isValidated: { 
    type: Boolean,
    default: false,
  },
  _owner: { // `_` is a convention for ObjectId
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
})

const Tshirt = mongoose.model('Tshirt', tshirtSchema)
module.exports = Tshirt

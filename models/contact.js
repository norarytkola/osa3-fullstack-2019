const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String, 
    minlength: 3,
    required:true,
    unique:true
  },
  number: {
    type: String,
    minlength:8,
    required:true,
    unique:true
  },
  important: Boolean
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
personSchema.plugin(validator)

module.exports = mongoose.model('Person', personSchema)
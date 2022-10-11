const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

/*const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })*/
const personSchema = new mongoose.Schema({
  name: String,
  number: {
    type: String,
    validate:{
      validator: function (numb) {
        console.log(numb)
        if (numb.length>7) {
          if (numb[2]==='-'|numb[3]==='-') {
            const lines= (numb.match(/-/g) || []).length
            if (lines===1) {
              return true
            } else {
              return false
            }
          }else{
            return false
          }
        }else{
          return false
        }
      },
      error: 'Wrong format of number'
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
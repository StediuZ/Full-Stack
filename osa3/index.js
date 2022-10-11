require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))



const Person = require('./models/person')

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })

})

app.get('/info', (req, res) => {
  res.send(
    '<p>Phonebook has info for '+Person.length+' people</p>'+ new Date()
  )
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        const listed = {
          name: person.name,
          number: person.number,
          id: person.id }
        response.json(listed)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  console.log(request.headers)
  console.log(request.body)

  if(!request.body.name|!request.body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  if(request.body.name.length < 3){
    return response.status(400).json({
      error: 'name too short'
    })
  }


  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)})
    .catch(() => {
      return response.status(400).json({
        error: 'wrong format of number'
      })
    }
    )
})

app.put('/api/persons/:id', (request, response, next) => {

  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



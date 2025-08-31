require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const PhoneBook = require('./models/phonebook')

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token("body", (req) => {
  return JSON.stringify(req.body)
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

app.use(cors())

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  PhoneBook.find().then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)  

  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const {name, number} = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'content missing' })
  }

  const phonebook = new PhoneBook({
    name,
    number
  })
  
  phonebook.save().then(savedPerson => res.json(savedPerson))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  PhoneBook.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = request.body
  const {id} = req.params
  
  PhoneBook.findById(id)
    .then(phonebook => {
      if (!phonebook) {
        return res.status(404).end()
      }

      phonebook.name = name
      phonebook.number = number

      return phonebook.save().then((updatedPhonebook) => {
        res.json(updatedPhonebook)
      })
    })
    .catch(e => next(e))
})

app.get('/api/info', (req, res) => {
  const date = new Date()
  res.send(
    `
        <div>
            <p>PhoneBook has info for ${persons.length} people</p>
            <p>${date}</p>
        </div>
    `
  )
})



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
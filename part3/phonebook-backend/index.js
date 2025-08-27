const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

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
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
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
  const exist = persons.find(p => p.name === name)
  if(exist || (!name || !number)) {
    return res.status(400).json({error:'name must be unique'})
  }

  const person = {
    id: Math.floor(Math.random() * 1000000000),
    name,
    number
  }
  persons.push(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
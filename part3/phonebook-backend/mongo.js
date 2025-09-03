const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@clustermooc.pc4cifk.mongodb.net/phonebook?retryWrites=true&w=majority&appName=ClusterMooc`
mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneBook = mongoose.model('PhoneBook', phonebookSchema)

if (process.argv.length === 3) {
  PhoneBook.find({}).then(result => {
    result.forEach(phoneBook => {
      console.log(phoneBook)
    })
    mongoose.connection.close()
  })
} else if(process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const phoneBook = new PhoneBook({
    name,
    number
  })

  phoneBook.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
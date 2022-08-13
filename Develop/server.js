const express = require('express')
const path = require('path')
const fs = require('fs')
const util = require('util')
const { uid } = require('uid')
const notes = require('./db/db.json')

const app = express()
const PORT = 3001

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)
const appendFile = util.promisify(fs.appendFile)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  console.log('you made a request')
  res.send('whatever!')
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// app.post('/api/notes', (req, res) => {
//   console.log(req.body)
//   readFile('db/db.json', 'utf8')
//   // const string = {
//   //   title: '',
//   //   text: '',
//   // }

//   // const stringify = JSON.stringify(req.body)

//   // console.log(read)
//   writeFile('db/db.json', JSON.stringify(req.body), (err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('success')
//     }
//   })

//   console.log(notes)
//   res.json(notes)
// })

app.post('/api/notes', (req, res) => {
  // writeFile('db/db.json', JSON.stringify(notes))
  newNote = {
    id: req.body.uid,
    title: req.body.title,
    text: req.body.text,
  }
  notes.push(newNote)
  res.json(notes)
})

// app.delete('/api/notes/:id', (req, res) => {
//   notes.filter((notes) => note.id === req.params.id)
// })

app.listen(PORT, () => {
  console.log(`now listening on port: ${PORT}`)
})

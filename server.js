const express = require('express')
const path = require('path')
const fs = require('fs')
const util = require('util')
const { uid } = require('uid')
const { parse } = require('path')
// let notes = require('./db/db.json')

const app = express()
const PORT = process.env.PORT || 3001

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
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.json(JSON.parse(data))
  })
  // res.send(notes)
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
  const newNote = {
    id: uid(),
    title: req.body.title,
    text: req.body.text,
  }
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    }
    // console.log(data)
    const dataArray = JSON.parse(data)
    const newData = [...dataArray, newNote]
    // console.log(JSON.stringify(newData))
    fs.writeFile('./db/db.json', JSON.stringify(newData), 'utf-8', (err) => {
      if (err) {
        console.log(err)
      }
    })
    res.send('item added success')
  })
  // notes.push(newNote)
  // res.json(notes)
})

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    }
    // console.log(data)
    const parseData = JSON.parse(data)
    const newData = parseData.filter((note) => note.id !== req.params.id)
    fs.writeFile('./db/db.json', JSON.stringify(newData), 'utf-8', (err) => {
      if (err) {
        console.log(err)
      }
    })
    res.send('item added success')
  })
})

app.listen(PORT, () => {
  console.log(`now listening on port: ${PORT}`)
})

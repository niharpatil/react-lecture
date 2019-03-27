const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
require('./db/db-connect')

const TodoItem = require('./db/models/TodoItem')

const app = express()
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get('/api/todoitems', (req,res) => {
  TodoItem.find()
  .then(items => {
    console.log('got items')
    res.json(items)
  })
  .catch(e => {
    console.log('error in getting items')
    res.status(500).send(e)
  })
})

app.post('/api/additem', (req,res) => {
  const newItem = new TodoItem({
    title: req.body.itemTitle
  })
  newItem.save()
  .then(item => {
    console.log('added items')
    res.send(200)
  })
  .catch(e => {
    console.log('error in adding items')
    res.status(500).send(e)
  })
})

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,'public','app.html'))
})

app.listen(3000, () => console.log('listening'))
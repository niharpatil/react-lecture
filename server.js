const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
require('./db/db-connect')

const TodoItem = require('./db/models/TodoItem')

const app = express()
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const User = require('./db/models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bcrypt = require('bcryptjs')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({email})
  .then(user => {
    if (!user) {
      return done(null, null)
    }
    if (bcrypt.compareSync(password,user.password)) {
      done(null, user)
    } else {
      done(new Error("Wrong password"))
    }
  })
  .catch(error => {
    done(error)
  })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    if (user) {
      return done(null, user)
    }
    done(null, null)
  })
  .catch(error => {
    done(error)
  })
})

app.use(passport.initialize())
app.use(passport.session())


app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname,'public','login.html'))
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))



app.get('/signup', (req,res) => {
  res.sendFile(path.join(__dirname,'public','signup.html'))
})

app.post('/signup', (req,res) => {
  const {email, password} = req.body
  User.findOne({email})
  .then(user => {
    if (user) {
      console.log('user already exists')
      return res.redirect('/signup')
    }
    const newUser = new User({
      email,
      password: bcrypt.hashSync(password, 8),
    })
    return newUser.save()
    .then(() => {
      res.redirect('/login')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/signup')
  })
})


const protectedMiddleware = (req,res,next) => {
  if (!req.user) {
    return res.redirect('/login')
  }
  next()
}

app.get('/api/todoitems', protectedMiddleware, (req,res) => {
  TodoItem.find()
  .then(items => {
    res.json(items)
  })
  .catch(e => {
    console.log('error in getting items')
    res.status(500).send(e)
  })
})

app.post('/api/additem', protectedMiddleware, (req,res) => {
  const newItem = new TodoItem({
    title: req.body.itemTitle
  })
  newItem.save()
  .then(item => {
    res.send(200)
  })
  .catch(e => {
    console.log('error in adding items')
    res.status(500).send(e)
  })
})

app.get('/', protectedMiddleware, (req,res) => {
  res.sendFile(path.join(__dirname,'public','app.html'))
})

app.listen(3000, () => console.log('listening'))
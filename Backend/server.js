const express = require('express')
const connection = require('./config/connection')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 5000

//Connect Database
connection()

//Init Middleware

app.use(express.json({ extended: false }))

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder

  app.use(express.static('../Frontend/client/build'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../Frontend/client', 'build', 'index.html')
    )
  })
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

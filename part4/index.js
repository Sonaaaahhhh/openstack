require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to MongoDB...')

mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.get('/', (req, res) => {
  res.send('Bloglist backend running 🚀')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
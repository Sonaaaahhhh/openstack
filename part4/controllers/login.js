const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const valid = user && await bcrypt.compare(password, user.passwordHash)

  if (!valid) {
    return res.status(401).json({ error: 'invalid credentials' })
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET
  )

  res.json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
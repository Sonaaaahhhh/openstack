const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const decoded = jwt.verify(req.token, process.env.SECRET)
  req.user = await User.findById(decoded.id)
  next()
}

module.exports = { tokenExtractor, userExtractor }
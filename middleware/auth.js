const jwt = require('jsonwebtoken')
const { UnAutenticated } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  //   console.log(authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAutenticated('No token provided')
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new UnAutenticated('You cannot access to this route')
  }
}

module.exports = authenticationMiddleware

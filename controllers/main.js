// require('dotenv').config()
const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new CustomAPIError('username or password not exist', 400)
  }
  const id = new Date().getDate()
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  res.status(200).json({ msg: 'user created', token })
}
const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }
  const token = authHeader.split(' ')[1]
  // console.log(token)
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decode)
    const luckyNum = Math.floor(Math.random() * 100)
    res.status(200).json({
      msg: `Hello ${decode.username}`,
      secret: `Here is your authorized data ${luckyNum}`,
    })
  } catch (error) {
    throw new CustomAPIError('You cannot access to this route', 401)
  }
}

module.exports = {
  login,
  dashboard,
}

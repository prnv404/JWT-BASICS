const express = require('express')
const Router = express.Router()

const { login, dashboard } = require('../controllers/main')

Router.route('/login').post(login)
Router.route('/dashboard').get(dashboard)

module.exports = Router

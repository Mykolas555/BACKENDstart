const express = require('express')
const morgan = require('morgan')
const playerRouter = require('./routes/playerRoutes')
const usersRouter = require('./routes/userRoutes')
const app = express()
app.use(express.json())

app.use(morgan('dev'))
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/players/users', usersRouter);

module.exports = app;
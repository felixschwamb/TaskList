const express = require("express");
// const Task = require("./models/task");

require("./db/mongoose");

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = 5000

// Necessary for POST-request
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => console.log('Server up on port ', port))
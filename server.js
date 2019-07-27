const express = require("express");
const Task = require("./models/task");
require("./db/mongoose");

const app = express();

// Necessary for POST-request
app.use(express.json());

const port = 5000;

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find({});

  try {
    res.json({ tasks });
    // res.send(tasks)
  } catch (e) {
    res.status(500).send();
  }
});

// app.get('/api/customers', (req, res) => {
//     const customers = [
//         {id: 1, firstName: 'John', lastName: 'Doe'},
//         {id: 2, firstName: 'Mary', lastName: 'Swanson'},
//         {id: 3, firstName: 'Steve', lastName: 'Smith'},
//     ];
//   res.json(tasks)
// })

app.post("/api/post-task", async (req, res) => {
  console.log("post-request received");
  console.log(req.body);

  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch("/api/update-task/:id", async (req, res) => {
  /*
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }    
    */

  try {
    /* const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) */
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/api/delete-task/:id', async (req, res) => {
    console.log('delete-request received')
    console.log(req.params)
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})



app.listen(port, () => console.log('Server up on port ', port))
const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router() 


// router.get("/api/tasks", async (req, res) => {
//     const tasks = await Task.find({});
  
//     try {
//       res.json({ tasks });
//     } catch (e) {
//       res.status(500).send();
//     }
//   });

// endpoint for fetching all tasks of a specific user
router.get('/tasks', auth, async (req, res) => {

  try {

    // count number of documents in collection
      // estimatedDocumentCount() has no options and gives back all documents without any filter option
      // const numTasks = await Task.estimatedDocumentCount()
    const numTasks = await Task.countDocuments( {owner: req.user._id} )
      // countDocuments() gives back only the documenents of the user, it offers a filter option

    const numTasksComp = await Task.countDocuments( {owner: req.user._id, completed: true} )
    const numTasksUncomp = await Task.countDocuments( {owner: req.user._id, completed: false} )

    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

      // option 1:
      // const tasks = await Task.find({ owner: req.user._id })
      // res.send(tasks)   

    // option 2:
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),              
        // skip: parseInt(req.query.skip),
        // sort
      }
    }).execPopulate()
      // await req.user.populate('tasks').execPopulate()
      const tasks = req.user.tasks 
      res.send({ tasks, numTasks, numTasksComp, numTasksUncomp })

      // res.send(req.user.tasks)
                    
  } catch(e) {
      res.status(500).send()
  }
})
  
  
router.post("/api/post-task", auth, async (req, res) => {
    console.log("post-request received");

    const task = new Task({
      ...req.body,
      owner: req.user._id
  })
  
    try {
      await task.save();
      res.status(201).send(task);
    } catch (e) {
      res.status(400).send(e);
    }
});

  
router.patch("/api/update-task/:id", async (req, res) => {
      const updates = Object.keys(req.body)
      const allowedUpdates = ['title', 'completed']
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
      if (!isValidOperation) {
          return res.status(400).send({ error: 'Invalid updates!' })
      }    
      
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    //   const task = await Task.findByIdAndUpdate(req.params.id, req.body);
  
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    } catch (e) {
      res.status(400).send(e);
    }
});


// endpoint for deleting a task by ID and owner
router.delete('/api/delete-task/:id', auth, async (req, res) => {
      console.log('delete-request received')
      // console.log(req.params)
      try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        
        if (!task) {
              res.status(404).send()
          }
          res.send(task)
      } catch(e) {
          res.status(500).send()
      }
})


module.exports = router
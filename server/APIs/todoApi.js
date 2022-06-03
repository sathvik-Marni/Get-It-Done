// import the express module
const exp = require('express')


// initialize the express router
const todoApp = exp.Router()


// handle the json data
todoApp.use(exp.json())


// install and import express-async-handler to handle asynchronous requests
const expressAsyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')


// get request handler for active records
todoApp.get('/active', expressAsyncHandler(async (req, res) => {

  let activeCollection =req.app.get('activeCollection')

  let todoData = await activeCollection.find().toArray()

  if(!todoData.length){
    res.send({message: 'No active records found'})
  }
  else{
    res.send({message: 'found records', payload: todoData})
  }
}))


//post requset handler to post active records
todoApp.post('/create-active-todo', expressAsyncHandler(async (req, res) => {

  let activeCollection = req.app.get('activeCollection')

  let activeTodo = req.body

  await activeCollection.insertOne(activeTodo)

  res.send({message: 'record inserted successfully'})
}))


// delete an active record
todoApp.delete('/delete-active-todo/:id', expressAsyncHandler(async (req, res) => {

  let activeCollection = req.app.get('activeCollection')

  let deleteTodoId = req.params.id

  let result = await activeCollection.deleteOne({_id: ObjectId(deleteTodoId)})

  res.send({message: 'Todo deleted successfully', payload: result})
}))


// get request handler for completed records
todoApp.get('/completed', expressAsyncHandler(async (req, res) => {

  let completedCollection = req.app.get('completedCollection')

  let completedTodos = await completedCollection.find().toArray()

  if(!completedTodos.length){
    res.send({message: 'No completed records found'})
  }
  else{
    res.send({message: 'found records', payload: completedTodos})
  }
}))


// post request handler to completed records
todoApp.post('/create-completed-todo', expressAsyncHandler(async (req, res) => {

  let completedCollection = req.app.get('completedCollection')

  let completedTodo = req.body

  await completedCollection.insertOne(completedTodo)

  res.send({message: 'record inserted successfully'})
}))


// delete request handler to delete completed records
todoApp.delete('/delete-completed-todo/:id', expressAsyncHandler(async (req, res) => {

  let completedCollection = req.app.get('completedCollection')

  let deleteTodoId = req.params.id

  let result = await completedCollection.deleteOne({_id: ObjectId(deleteTodoId)})

  res.send({message: 'Todo deleted successfully', payload: result})

}))


// export todoApp
module.exports = todoApp
// install and import express application
const exp = require('express')


// get the express object calling express function
const app = exp()


// import path module
const path = require('path')


// connect react app to index
app.use(exp.static(path.join(__dirname, '..', 'client', 'build')))


// middleware used to handle json data
app.use(exp.json())


// initialize environment variables
require('dotenv').config()


// install and import mongodb to establish a connection
const mClient = require('mongodb').MongoClient


// connection url
const dbUrl = process.env.DATABASE_CONNECTION_URL


// making the connection
mClient.connect(dbUrl)
.then(
  (client) => {
    // get the database
    const db = client.db('GetItDone')

    // get the required collection from the database
    const activeCollection = db.collection('activeCollection')
    const completedCollection = db.collection('completedCollection')

    // set the collection to use in the api's
    app.set('activeCollection', activeCollection)
    app.set('completedCollection', completedCollection)

    // confirmation message
    console.log('DB connected successfully')
  }
)
.catch(err => console.log(`Error occured: ${err.message}`))


// forwarding the request to todoApi
const todoApp = require('./APIs/todoApi')
app.use('/todo', todoApp)


// handling page reloads
app.use('*', (req, res) => {
  res.sendFile(__dirname, '..', 'client', 'build', 'index.html')
})


// handling invalid paths
app.use((req, res) => {
  res.send({message: `Invalid path: ${req.url}`})
})


// handling errors
app.use((err, req, res) => {
  res.send({message: 'Error Occured', reason: err.message})
})


// initializing the port variable
const port = process.env.PORT


// starting the port
app.listen(port, () => console.log(`Listening on port ${port}`))
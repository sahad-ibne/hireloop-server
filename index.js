import express from 'express'

import { MongoClient } from 'mongodb'
import cors from 'cors'
import 'dotenv/config'

const client = new MongoClient(
  `mongodb://${process.env.DB_USER}:${process.env.DB_USER_PASS}@ac-hipotyc-shard-00-00.wwd4izf.mongodb.net:27017,ac-hipotyc-shard-00-01.wwd4izf.mongodb.net:27017,ac-hipotyc-shard-00-02.wwd4izf.mongodb.net:27017/?ssl=true&replicaSet=atlas-2zuwji-shard-0&authSource=admin`
)

export async function connectToMongoDB () {
  try {
    await client.connect()
    console.log('You successfully connected to MongoDB!')
    return client
  } catch (err) {
    console.dir(err)
  }
}

const connectedClient = await connectToMongoDB()
const database = connectedClient.db('hireloopdb')
const users = database.collection('user')
const jobs = database.collection('jobs')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('hire loop is looping')
})

app.get('/users', async (req, res) => {
  const cursor = users.find({})
  const result = await cursor.toArray()
  res.send(result)
})

app.listen(port, () => {
  console.log(`Hire loop is running on port ${port}`)
})

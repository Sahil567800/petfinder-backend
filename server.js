import express from 'express'
import { connectionDB } from './config/connection.js'
import cors from "cors"

//app config
const app = express()
const port = 3000
connectionDB()

//middleware
app.use(cors())
app.use(express.json())

//API endpoints
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

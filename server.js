import express from 'express';
import { connectionDB } from './config/connection.js';
import cors from "cors";
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js'
//app config
dotenv.config()
const app = express()
const port = 4000
connectionDB()

//middleware
app.use(express.json())
app.use(cors())

//API endpoints
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/user',userRoute)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

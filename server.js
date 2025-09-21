import express from 'express';
import { connectionDB } from './config/connection.js';
import cors from "cors";
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js'
import petRoute from './routes/petRoute.js'
import orderRoute from './routes/orderRoute.js'
import path from 'path';
//app config
dotenv.config()
const app = express()
const port = 4000
connectionDB()

//middleware
app.use("/uploads",express.static(path.join(process.cwd(),"uploads")))
app.use(express.json())
app.use(cors())

//API endpoints
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/user',userRoute)
app.use('/api/pet',petRoute)
app.use('/api/order',orderRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

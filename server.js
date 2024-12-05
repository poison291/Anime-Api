import express from 'express'
import {configDotenv } from 'dotenv'
import mongoose from 'mongoose'
import apiPoint from './Router/apiPoint.js'

configDotenv()
const app = express()
const port = process.env.PORT


// Connecting with Databases

const connection = process.env.DATABASE_URL

if (!connection) {
    console.log(`Failed to connect with Database check .env file`);
}
else {
    try {
        mongoose.connect(connection)
        console.log(`Connected To Database Succesfully`)

    } catch (error) {
        console.error(error.message);

    }
}

app.use(express.json())
app.use("/anime", apiPoint)


app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
    
})


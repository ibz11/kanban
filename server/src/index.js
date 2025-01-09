import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import compression from 'compression'; 

import taskRouter from './routes/task.route.js'


const app = express();
const port =process.env.PORT || 3000
const dbUrl = process.env.MONGO_URL


app.use(express.json())
app.use(cors())
app.use(compression())


const v1Url='/api/v1'

app.use(`${v1Url}/task`, taskRouter);

app.get('/', (req, res) =>{
    res.send('Hello World')
})




mongoose.connect(dbUrl)
.then(() => {
console.log('Connected to MongoDB')


app.listen(port,()=>{
console.log(`listening on http://localhost:${port}`)
});


})
.catch((error) => console.error('MongoDB connection error:', error));

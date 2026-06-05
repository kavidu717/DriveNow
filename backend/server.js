import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';


dotenv.config();

const app = express();
connectDB();

app.get('/', (req, res) => {
    res.send('drive now backend is running');
})


 app.listen(3000, () => {
    console.log('Server is running on port 3000');
 })
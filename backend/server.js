import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import userRouter from './src/routes/userRoutes.js';
import vehicleRouter from './src/routes/vehicleRoutes.js';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send('drive now backend is running');
})

app.use(express.json());

app.use('/api/v1/auth', userRouter);

app.use('/api/v1/vehicles',vehicleRouter);







 app.listen(3000, () => {
    console.log('Server is running on port 3000');
 })
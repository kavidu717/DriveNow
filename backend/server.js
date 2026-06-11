import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import userRouter from './src/routes/userRoutes.js';
import vehicleRouter from './src/routes/vehicleRoutes.js';
import cors from 'cors';
import bookingRouter from "./src/routes/bookingRoutes.js"
import paymentRouter from "./src/routes/paymentRoutes.js"


dotenv.config();

const app = express();

app.use(cors());

connectDB();
const PORT=process.env.PORT||3000

app.get('/', (req, res) => {
    res.send('drive now backend is running');
})

app.use(express.json());

app.use('/api/v1/auth', userRouter);

app.use('/api/v1/vehicles',vehicleRouter);

app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/payment",paymentRouter);








 app.listen(PORT, () => {
    console.log('Server is running on port 3000');
 })
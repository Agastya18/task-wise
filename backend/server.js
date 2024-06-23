import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import users from './data.js';
import path from 'path';
import connectDB from './config/connectDB.js';
import userRoute from './routes/user.route.js';
import transactionRoute from './routes/transaction.route.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT=process.env.PORT || 8000

const __dirname = path.resolve();

connectDB();

//middlewares
app.use(express.json());
app.use(cors(
    // {
    //     origin:"http://localhost:5173",
    //     credentials:true
    // }
));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

//routes
app.use('/api/users', userRoute);
app.use('/api/transactions', transactionRoute);


// Serve static assets if in production
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
}


)


app.listen(PORT, () => {
   
    console.log(`Serve running at:  http://localhost:${PORT}`);
})
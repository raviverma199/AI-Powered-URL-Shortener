import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();



app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on port 4000');
}).on('error', (err) => {
    console.error(err);
    process.exit(1);
});
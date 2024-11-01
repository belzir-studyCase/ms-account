import express from "express";
import authRouter from './routes/authentification.router.js';
import bodyParser from 'body-parser';
const app = express();
import connectToMongoDB from './database/connection.js';
connectToMongoDB();
app.use(express.json());
// Set default route for '/'
app.get('/', (req, res) => {
  res.send('Welcome to the MS Account URL!');
});
app.use("/", authRouter);

app.get('/test', (req, res) => {
  res.send('Welcome to the MS Account URL!');
});

app.listen(3001, () => {
  console.log(`Server is running at http://localhost:3001`);
});

// Export the app instance
export default app;

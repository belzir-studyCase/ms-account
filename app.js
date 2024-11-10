import express from "express";
import authRouter from './routes/authentification.router.js';
const app = express();
import connectToMongoDB from './database/connection.js';
import { swaggerUi, swaggerDocs } from './docsconfig/swaggerConfig.js';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
connectToMongoDB();
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());

app.use("/", authRouter);

https.createServer(options, app).listen(3001, () => {
  console.log('HTTPS server running on https://localhost:3001');
});



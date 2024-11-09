import express from "express";
import authRouter from './routes/authentification.router.js';
const app = express();
import connectToMongoDB from './database/connection.js';
import { swaggerUi, swaggerDocs } from './docsconfig/swaggerConfig.js';

connectToMongoDB();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());

app.use("/", authRouter);

app.listen(3001, () => {
  console.log(`Server is running at http://localhost:3001`);
});

export default app;

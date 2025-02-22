import express from 'express';
import cors from 'cors';
import routes from "../routes/index.js";
import {errorHandler} from "../middlewares/errorHandler.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
import express, { Request, Response } from 'express';
import usersRoutes from './routes/users';
import dotenv from 'dotenv';
import connection from "./utils/dbConnection";
dotenv.config();

const app = express();
const port =  process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! This is IncognitoPal...');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // TODO: init the database connection here
});
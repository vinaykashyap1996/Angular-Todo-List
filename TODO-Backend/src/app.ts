import express, { Response, Request } from 'express';
import todoRoutes from './routes/todo.routes';
import cors from 'cors';
import { errorHandler } from './middleware/errorhandler';

export const app = express();

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['PATCH', 'GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: 'Content-Type,Authorization'
  }));

app.use(express.json());


app.get('/', (req: Request, res: Response): any => {
    return res.status(200).json({ message: 'Welcome to the Todo Backend' });
});


app.use('/api', todoRoutes);

app.use(errorHandler);

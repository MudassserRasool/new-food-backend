import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import connectDb from './config/db.js';
import initializeSocketIo from './config/socket.js';
import uploadConfig from './config/uploadConfig.js';
import { PORT } from './constants/environment.js';
import { apiVersion } from './constants/index.js';
import utilityController from './controllers/utilityController.js';
import errorHandler from './middlewares/errorHandler.js';
import errorLogger from './middlewares/errorLogger.js';
import { loggerMiddleware } from './middlewares/logger.js';
import rateLimiter from './middlewares/ratelimter.js';
import timeout from './middlewares/timeout.js';
import uploadMiddleware from './middlewares/uploadMiddleware.js';
import categoryRouter from './routes/categoryRoute.js';
import productRouter from './routes/productRoute.js';
import profileRouter from './routes/profile.js';
import userRouter from './routes/user.js';
import orderSocket from './socket/orderSocket.js';
const app = express();
// Attach socket.io to the server
const { io, server } = initializeSocketIo(app);

app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use(timeout(50000));

const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'));
app.use(loggerMiddleware);

app.get(`/api/${apiVersion}/`, async (req, res) => {
  res.send('Hello world, Server is running');
});

app.use(`/api/${apiVersion}/user`, userRouter);
app.use(`/api/${apiVersion}/profile`, profileRouter);
app.use(`/api/${apiVersion}/category`, categoryRouter);
app.use(`/api/${apiVersion}/product`, productRouter);

app.post(
  `/api/${apiVersion}/upload`,
  uploadMiddleware,
  uploadConfig.single('file'),
  utilityController.uploadImage
);

app.use(errorLogger);
app.use(errorHandler);

orderSocket(io);
server.listen(PORT, async () => {
  await connectDb(PORT);
});
export { io };

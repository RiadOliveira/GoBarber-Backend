import express from 'express';
import 'express-async-errors';
import routes from './routes/index';
import './database';
import 'reflect-metadata';
import uploadConfig from './config/upload';
import GlobalErrorHandler from './errors/GlobalErrorHandler';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(GlobalErrorHandler);

// eslint-disable-next-line no-console
app.listen('3333', () => console.log('Server started on port 3333!'));

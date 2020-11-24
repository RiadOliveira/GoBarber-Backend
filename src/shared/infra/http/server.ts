import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import GlobalErrorHandler from '@shared/errors/GlobalErrorHandler';
import 'reflect-metadata';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(cors());
app.use(routes);
app.use(GlobalErrorHandler);

// eslint-disable-next-line no-console
app.listen('3333', () => console.log('Server started on port 3333!'));

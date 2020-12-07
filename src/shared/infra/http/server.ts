import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import uploadConfig from '@config/upload';
import GlobalErrorHandler from '@shared/errors/GlobalErrorHandler';
import rateLimiter from './middlewares/RateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(cors());
app.use(rateLimiter);
app.use(routes);
app.use(errors());
app.use(GlobalErrorHandler);

// eslint-disable-next-line no-console
app.listen('3333', () => console.log('Server started on port 3333!'));

import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersAvatarController = new UsersAvatarController();
const usersController = new UsersController();
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    ensureAuthentication,
    upload.single('avatar'),
    usersAvatarController.update,
);

export default usersRouter;

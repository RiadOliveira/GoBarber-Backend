import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersAvatarController = new UsersAvatarController();
const usersController = new UsersController();
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
    '/avatar',
    ensureAuthentication,
    upload.single('avatar'),
    usersAvatarController.update,
);

export default usersRouter;

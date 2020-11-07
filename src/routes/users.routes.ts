import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUser';
import ensureAuthentication from '../middleware/ensureAuthentication';
import UpdateUserAvatarService from '../services/UpdateUserAvatar';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const newUser = await createUser.execute({
        name,
        email,
        password,
    });

    const userWithoutPassword = {
        name: newUser.name,
        email: newUser.email,
        id: newUser.id,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
    };

    return response.json(userWithoutPassword);
});

usersRouter.patch(
    '/avatar',
    ensureAuthentication,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const { password, ...user } = await updateUserAvatar.execute({
            userId: request.user.id,
            avatarFileName: request.file.filename,
        });

        return response.json(user);
    },
);

export default usersRouter;

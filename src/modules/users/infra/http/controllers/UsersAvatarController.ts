import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UsersAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const updatedUser = await updateUserAvatar.execute({
            userId: request.user.id,
            avatarFileName: request.file.filename,
        });

        return response.json(classToClass(updatedUser));
    }
}

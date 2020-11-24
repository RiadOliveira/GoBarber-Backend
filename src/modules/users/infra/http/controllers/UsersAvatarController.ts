import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar';

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

        const userWithoutPassword = {
            name: updatedUser.name,
            email: updatedUser.email,
            id: updatedUser.id,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        };

        return response.json(userWithoutPassword);
    }
}

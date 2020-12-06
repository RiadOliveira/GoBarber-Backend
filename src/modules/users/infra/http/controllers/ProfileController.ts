import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.execute(request.user.id);

        const userWithoutPassword = {
            name: user.name,
            email: user.email,
            id: user.id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        return response.json(userWithoutPassword);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password, oldPassword } = request.body;
        const userId = request.user.id;

        const updateUser = container.resolve(UpdateProfileService);

        const user = await updateUser.execute({
            userId,
            name,
            email,
            password,
            oldPassword,
        });

        const userWithoutPassword = {
            name: user.name,
            email: user.email,
            id: user.id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        return response.json(userWithoutPassword);
    }
}

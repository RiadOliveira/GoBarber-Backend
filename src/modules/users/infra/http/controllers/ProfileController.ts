import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.execute(request.user.id);

        return response.json(classToClass(user));
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

        return response.json(classToClass(user));
    }
}

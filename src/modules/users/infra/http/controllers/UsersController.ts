import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUser';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

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
    }
}

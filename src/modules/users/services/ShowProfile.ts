import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

@injectable()
export default class ShowProfileService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUserRepository,
    ) {}

    public async execute(userId: string): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 400);
        }

        return user;
    }
}

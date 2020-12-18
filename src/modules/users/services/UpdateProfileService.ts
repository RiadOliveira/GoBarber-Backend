import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
    userId: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

@injectable()
export default class UpdateProfileService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUserRepository,
        @inject('HashProvider') private hashProvider: IHashProvider,
        @inject('CacheProvider') private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        name,
        email,
        userId,
        password,
        oldPassword,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 400);
        }

        const findedUserByEmail = await this.usersRepository.findByEmail(email);

        if (findedUserByEmail && findedUserByEmail.id !== userId) {
            throw new AppError('E-mail already in use', 400);
        }

        user.name = name;
        user.email = email;

        if (password && oldPassword) {
            const comparedPassword = await this.hashProvider.compareHash(
                oldPassword,
                user.password,
            );

            if (!comparedPassword) {
                throw new AppError('Old password does not match', 400);
            }

            user.password = await this.hashProvider.generateHash(password);
        } else if (password) {
            throw new AppError(
                'The old password need to be informed to set the new',
            );
        }

        const updatedUser = this.usersRepository.save(user);

        await this.cacheProvider.invalidate(`providers-list:${userId}`);

        await this.cacheProvider.save(
            `providers-list:${userId}`,
            classToClass(user),
        );

        return updatedUser;
    }
}

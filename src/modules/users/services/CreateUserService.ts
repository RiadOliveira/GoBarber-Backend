import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;

    email: string;

    password: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUserRepository,
        @inject('HashProvider') private hashProvider: IHashProvider,
        @inject('CacheProvider') private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const verifyEmail = await this.usersRepository.findByEmail(email);

        if (verifyEmail) {
            throw new AppError('Email already used', 400);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const newUser = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.cacheProvider.invalidatePrefix('providers-list');

        return newUser;
    }
}

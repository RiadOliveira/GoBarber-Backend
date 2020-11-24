import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
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
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const verifyEmail = await this.usersRepository.findByEmail(email);

        if (verifyEmail) {
            throw new AppError('Email already used', 400);
        }

        const hashedPassword = await hash(password, 8);

        const newUser = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return newUser;
    }
}

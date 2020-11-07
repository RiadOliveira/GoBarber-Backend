import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    name: string;

    email: string;

    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const verifyEmail = await userRepository.findOne({
            where: { email },
        });

        if (verifyEmail) {
            throw new AppError('Email already used', 400);
        }

        const hashedPassword = await hash(password, 8);

        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(newUser);

        return newUser;
    }
}

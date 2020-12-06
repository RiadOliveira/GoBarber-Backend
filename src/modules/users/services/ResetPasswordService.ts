import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
export default class ResetPasswordService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUserRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('HashProvider') private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Invalid token', 400);
        }

        const tokenCreatedAt = userToken.createdAt;
        const comparedDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), comparedDate)) {
            throw new AppError('Token expired', 400);
        }

        const findedUser = await this.usersRepository.findById(
            userToken.userId,
        );

        if (!findedUser) {
            throw new AppError('Non-existing user', 400);
        }

        findedUser.password = await this.hashProvider.generateHash(password);

        this.usersRepository.save(findedUser);
    }
}

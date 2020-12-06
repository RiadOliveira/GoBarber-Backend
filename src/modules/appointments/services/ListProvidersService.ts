import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
export default class ListProvidersService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUserRepository,
    ) {}

    public async execute(userId: string): Promise<User[]> {
        const users = await this.usersRepository.findAllProviders({
            exceptUserId: userId,
        });

        return users;
    }
}

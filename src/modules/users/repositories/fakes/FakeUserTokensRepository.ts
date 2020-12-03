import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { v4 } from 'uuid';

class FakeUserTokensRepository implements IUserTokensRepository {
    private userTokens: UserToken[] = [];

    public async generate(userId: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: v4(),
            token: v4(),
            userId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const findedUser = this.userTokens.find(
            userToken => userToken.token === token,
        );

        return findedUser;
    }
}

export default FakeUserTokensRepository;

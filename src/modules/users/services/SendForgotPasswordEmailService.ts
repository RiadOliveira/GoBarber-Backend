import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUserRepository,
        @inject('MailProvider') private mailProvider: IMailProvider,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const findedUser = await this.usersRepository.findByEmail(email);

        if (!findedUser) {
            throw new AppError('Email de usuário inexistente', 400);
        }

        const { token } = await this.userTokensRepository.generate(
            findedUser.id,
        );

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: findedUser.name,
                email,
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: findedUser.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        });
    }
}

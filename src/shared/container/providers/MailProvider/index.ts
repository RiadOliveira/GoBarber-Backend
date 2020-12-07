import { container } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';

const providers = {
    ethereal: EtherealMailProvider,
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(providers.ethereal),
);

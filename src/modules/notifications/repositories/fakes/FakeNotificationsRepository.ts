import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { ObjectID } from 'mongodb';
import Notification from '../../infra/typeorm/schemas/Notification';

export default class NotificationsRepository
    implements INotificationsRepository {
    private notifications: Notification[] = [];

    public async create({
        content,
        recipientId,
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = new Notification();

        Object.assign(notification, {
            id: new ObjectID(),
            content,
            recipientId,
        });

        this.notifications.push(notification);

        return notification;
    }
}

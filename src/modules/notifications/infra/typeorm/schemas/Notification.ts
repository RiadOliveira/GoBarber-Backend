import {
    ObjectID,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
export default class Notification {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    content: string;

    @Column('uuid')
    recipientId: string;

    @Column({ default: false })
    read: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

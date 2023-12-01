import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    paranoid: true,
    timestamps: true
})
export class User extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        unique: true
    })
    id: string;

    @Column({
        allowNull: false
    })
    first_name: string;

    @Column
    last_name: string;

    @Column
    phone_number: string;

    @Column({
        unique: true,
        allowNull: false,
        type: DataType.BIGINT
    })
    telegram_id: bigint;

    @Column
    username: string;

    @Column({
        allowNull: false
    })
    last_step: string;
}

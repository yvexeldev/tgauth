import { Sequelize } from 'sequelize-typescript';
import { config } from '../services/index.js';
import { User } from '../models/index.js';


const sequelize = new Sequelize({
    database: config.getOrThrow('DATABASE'),
    dialect: 'postgres',
    username: config.getOrThrow('DB_USERNAME'),
    password: config.getOrThrow('DB_PASSWORD'),
    models: [User],
    logging: false
});

export const database = sequelize;

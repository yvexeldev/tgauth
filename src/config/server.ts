import { mainRoutes } from '../routes/index.js';
import { config } from '../services/index.js';
import express from 'express';

export const SERVER_PORT = config.get('PORT') || 3000;
const server = express();

server.use(express.json());
server.use('/api', mainRoutes);

export { server };

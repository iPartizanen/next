// Core
import winston from 'winston';

export const clientLogger = winston.createLogger({
  transports: [
    new winston.transports.Http({
      host: 'localhost',
      port: 3000,
      path: '/api/logs/rest',
    }),
  ],
  format: winston.format.json(),
});
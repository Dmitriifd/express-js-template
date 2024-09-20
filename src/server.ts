import app from './app';
import { env } from './config/env';

import { log, error, info } from './lib/chalkLogger';
import { initDB, closeDB } from './lib/initDB';

const startServer = async () => {
  try {
    await initDB();
    const server = app.listen(env.PORT, () => {
      log(info(`Сервер запущен на http://localhost:${env.PORT}`));
    });

    process.on('SIGINT', async () => {
      await closeDB();
      server.close(() => {
        log(info('Server closed'));
        process.exit(0);
      });
    });
  } catch (err) {
    log(error('Error starting server:'));
    console.error(err);
    process.exit(1);
  }
};

startServer();

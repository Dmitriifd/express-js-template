import app from './app';
import { config } from './config';
import { log, error, info } from './lib/chalkLogger';
import { initDB, closeDB } from './lib/initDB';

const startServer = async () => {
  try {
    await initDB();
    const server = app.listen(config.PORT, () => {
      log(info(`Сервер запущен на http://localhost:${config.PORT}`));
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

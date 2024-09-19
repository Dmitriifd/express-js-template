import app from './app';
import { config } from './config';
import { log, error, success } from './lib/chalkLogger';
import { initDB } from './lib/initDB';

const startServer = async () => {
  try {
    await initDB();
    app.listen(config.PORT, () => {
      log(success(`Сервер запущен на http://localhost:${config.PORT}`));
    });
  } catch (err) {
    log(error('Error starting server:'));
    console.error(err);
    process.exit(1);
  }
};

startServer();

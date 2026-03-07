/**
 * Bot entry point - called by Railway
 * Starts Baileys WhatsApp bot and handles graceful shutdown
 */

import process from 'process';
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true, singleLine: false },
  },
});

let shutdownInProgress = false;

async function main(): Promise<void> {
  try {
    const { startBot, shutdownBot } = await import('./bot/index.js');

    await startBot();

    const healthInterval = setInterval(() => {
      logger.debug('Bot health check: running');
    }, 60000);

    const handleShutdown = async (signal: string) => {
      if (shutdownInProgress) {
        logger.info('Shutdown already in progress, ignoring signal');
        return;
      }

      shutdownInProgress = true;
      logger.info({ signal }, 'Received shutdown signal');

      clearInterval(healthInterval);

      try {
        await shutdownBot();
        logger.info('Bot shutdown successfully');
        process.exit(0);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logger.error({ error: message }, 'Error during shutdown');
        process.exit(1);
      }
    };

    process.on('SIGINT', () => handleShutdown('SIGINT'));
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));

    process.on('uncaughtException', (error) => {
      logger.error({ error }, 'Uncaught exception');
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error({ reason, promise }, 'Unhandled promise rejection');
      process.exit(1);
    });

    logger.info('Bot process started successfully');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error({ error: message }, 'Failed to start bot');
    process.exit(1);
  }
}

void main();

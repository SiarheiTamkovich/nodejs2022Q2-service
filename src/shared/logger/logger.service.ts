import { Injectable, LoggerService } from '@nestjs/common';
import pino from './pino.transport';

@Injectable()
export class LogService implements LoggerService {
  // 'log' level log.

  log(obj: unknown) {
    pino.info(obj);
  }

  // 'error' level log.

  error(obj: unknown) {
    pino.fatal(obj);
  }

  // 'warn' level log.

  warn(obj: unknown) {
    pino.error(obj);
  }

  // 'debug' level log.

  debug?(obj: unknown) {
    pino.debug(obj);
  }

  // 'verbose' level log.

  verbose?(obj: unknown) {
    pino.trace(obj);
  }
}

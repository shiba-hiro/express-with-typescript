import log4js from 'log4js';

log4js.addLayout('json', () => (logEvent) => JSON.stringify(logEvent));

log4js.configure({
  appenders: {
    out: { type: 'stdout', layout: { type: 'json' } },
  },
  categories: {
    default: { appenders: ['out'], level: process.env.LOG_LEVEL || 'debug' },
  },
  pm2: process.env.NODE_ENV === 'production',
});

const logger = log4js.getLogger();
export default logger;

// config/log4js.ts

import * as path from 'path';
const baseLogPath = path.resolve(__dirname, './logs');
const log4jsConfig = {
  appenders: {
    console: {
      type: 'console',
    },
    access: {
      type: 'dateFile',
      filename: `${baseLogPath}/access/access.log`, // access.20230207.log
      alwaysIncludePattern: true,
      pattern: 'ddMMyyyy',
      daysToKeep: 1,
      numBackups: 1,
      category: 'http',
      keepFileExt: true,
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      pattern: 'ddMMyyyy',
      daysToKeep: 1,
      // maxLogSize: 10485760,
      numBackups: 1,
      keepFileExt: true,
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      pattern: 'ddMMyyyy',
      daysToKeep: 1,
      // maxLogSize: 10485760,
      numBackups: 1,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
};

export default log4jsConfig;

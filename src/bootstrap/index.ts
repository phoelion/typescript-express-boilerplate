import { Application, urlencoded, json as expressJSon } from 'express';
import * as mongoSanitize from 'express-mongo-sanitize';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as morgan from 'morgan';
import helmet from 'helmet';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xss = require('xss-clean');

export default function bootstrap(app: Application) {
  app.use(helmet());
  app.use(cors());
  app.use(urlencoded({ extended: true, limit: '10kb' }));
  app.use(expressJSon());
  app.use(cookieParser());
  app.use(mongoSanitize());
  app.use(xss());
  app.use(compression());
  app.use(morgan('dev'));
}

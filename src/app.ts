import * as express from 'express';
import { Application } from 'express';
import RouteService from './router/routeService';
import exceptionHandler from './middlewares/error/index';
import bootstrap from './bootstrap';
import logger from './config/logger';
import config from './config/config';

class App {
  public app: Application;
  public port: number;
  public router: RouteService;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.router = new RouteService(this.app);
  }

  public start(): void {
    bootstrap(this.app);
    this.router.run();
    exceptionHandler(this.app);
    this.app.listen(this.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  }
  public close(): void {
    logger.info('Server closed');
    process.exit(1);
  }
}

export default App;

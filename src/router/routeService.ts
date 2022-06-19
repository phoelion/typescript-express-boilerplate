import router from '../components/user/router'
import { Application, Router } from 'express'
import RouteEngine from './router'
import config from 'config/config'

class RouteService {
  private app: Application
  private router: RouteEngine
  public constructor(app: Application) {
    this.app = app
    this.router = new RouteEngine()
    this.bindRouters()
  }

  public bindRouters() {
    //register the other rotes here
    this.router.registerRouter('/api/v1/', router)
    // if (config.env === 'development') {
    //   this.router.registerRouter('/api/v1/docs', docsRouter)
    // }
  }

  public run() {
    this.router.getRouters().forEach((router: Router, routeName: string) => {
      this.app.use(routeName, router)
    })
  }
}

export default RouteService

import { Router } from 'express';

class RouteEngine {
  private routers: Map<string, Router> = new Map<string, Router>();

  public registerRouter(routeName: string, router: Router) {
    this.routers.set(routeName, router);
  }

  public getRouters() {
    return this.routers;
  }
}

export default RouteEngine;

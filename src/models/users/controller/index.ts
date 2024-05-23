import { Router, Request, Response, NextFunction } from "express";

export class UserController {
  router;
  path = "/user";

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}
}

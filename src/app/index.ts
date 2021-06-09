import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import routes from './routes';
import upload from './utils/configs/upload';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.init();
    this.routes();
    // this.middlewares();
  }

  private init() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes() {
    this.app.use('/file', express.static(upload.directory));
    this.app.use(routes);
  }

  private middlewares() {
    this.app.use();
  }
}

export default new App().app;

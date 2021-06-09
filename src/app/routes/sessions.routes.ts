import { Router } from 'express';
import sessionController from '../controllers/session.controller';

const sessionRouter = Router();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;

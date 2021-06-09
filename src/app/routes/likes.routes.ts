import { Router } from 'express';
import likeController from '../controllers/like.controller';
import isAuthenticated from '../utils/middlewares/isAuthenticated';

const likesRouter = Router();

likesRouter.use(isAuthenticated);

likesRouter.put('/:id', likeController.update);

export default likesRouter;

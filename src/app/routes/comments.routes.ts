import { Router } from 'express';
import commentController from '../controllers/comment.controller';
import isAuthenticated from '../utils/middlewares/isAuthenticated';

const commentRouter = Router();

commentRouter.use(isAuthenticated);

commentRouter.get('/:id', commentController.show);

commentRouter.post('/:id', commentController.create);

export default commentRouter;

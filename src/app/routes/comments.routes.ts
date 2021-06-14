import { Router } from 'express';
import commentController from '../controllers/comment.controller';
import isAuthenticated from '../utils/middlewares/isAuthenticated';

const commentRouter = Router();

commentRouter.get('/:id', commentController.show);

commentRouter.use(isAuthenticated);

commentRouter.post('/', commentController.create);

export default commentRouter;

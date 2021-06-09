import { Router } from 'express';
import commentsRouter from './comments.routes';
import likesRouter from './likes.routes';
import postsRouter from './posts.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/posts', postsRouter);
routes.use('/comments', commentsRouter);
routes.use('/likes', likesRouter);

export default routes;

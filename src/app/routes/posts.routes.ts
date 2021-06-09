import { Router } from 'express';
import multer from 'multer';
import postController from '../controllers/post.controller';
import uploadConfig from '../utils/configs/upload';
import isAuthenticated from '../utils/middlewares/isAuthenticated';

const postsRouter = Router();
const upload = multer(uploadConfig);

postsRouter.get('/all', postController.index);

postsRouter.use(isAuthenticated);

postsRouter.get('/', postController.show);

postsRouter.post('/', upload.single('post'), postController.create);

postsRouter.delete('/:id', postController.delete);

export default postsRouter;

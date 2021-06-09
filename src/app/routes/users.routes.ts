import { Router } from 'express';
import multer from 'multer';
import userController from '../controllers/user.controller';
import uploadConfig from '../utils/configs/upload';
import isAuthenticated from '../utils/middlewares/isAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', userController.create);

usersRouter.use(isAuthenticated);

usersRouter.put('/', upload.single('avatar'), userController.update);

export default usersRouter;

import { Request, Response } from 'express';
import CreateUserService from '../services/createUser.service';
import UpdateAvatarService from '../services/updateAvatar.service';

interface User {
  name: string;
  email: string;
  password?: string;
}

class UserController {
  public async create(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const createUser = new CreateUserService();

      const user: User = await createUser.execute({ name, email, password });

      delete user.password;

      return response.status(201).json(user);
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.user;
    const { filename } = request.file;

    try {
      const updateAvatar = new UpdateAvatarService();

      const user: User = await updateAvatar.execute({ user_id: id, filename });

      delete user.password;

      return response.status(201).json(user);
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }
}

export default new UserController();

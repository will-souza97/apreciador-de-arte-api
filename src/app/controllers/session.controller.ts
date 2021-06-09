import { Request, Response } from 'express';
import AuthenticateUserService from '../services/authenticateUser.service';

class SessionController {
  public async create(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const authenticateUser = new AuthenticateUserService();

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      // @ts-ignore-
      delete user.password;

      return response.status(201).json({ user, token });
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }
}

export default new SessionController();

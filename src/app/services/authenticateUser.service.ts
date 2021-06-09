import { compare } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/user.model';
import authConfig from '../utils/configs/auth';
import AppError from '../utils/errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.');
    }

    const { secret, expiresIn } = authConfig;

    const token: string = sign({}, secret as Secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;

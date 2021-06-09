import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/user.model';
import AppError from '../utils/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userAlreadyExists = await usersRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists with this email.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

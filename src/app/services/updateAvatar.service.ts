import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import User from '../models/user.model';
import uploadConfig from '../utils/configs/upload';
import AppError from '../utils/errors/AppError';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateAvatarService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError('User does not exists.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;

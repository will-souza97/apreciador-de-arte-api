import { getRepository } from 'typeorm';
import Post from '../models/post.model';
import User from '../models/user.model';
import AppError from '../utils/errors/AppError';

interface Request {
  user_id: string;
  filename: string;
}

interface Response {
  post: Post;
}

class CreatePostService {
  public async execute({ user_id, filename }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const postsRepository = getRepository(Post);

    const post = postsRepository.create({
      user_id,
      image_url: filename,
    });

    await postsRepository.save(post);

    return { post };
  }
}

export default CreatePostService;

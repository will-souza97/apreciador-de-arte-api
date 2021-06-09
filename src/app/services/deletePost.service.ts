import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import Post from '../models/post.model';
import uploadConfig from '../utils/configs/upload';
import AppError from '../utils/errors/AppError';

interface Response {
  post: Post;
}

class DeletePostService {
  public async execute(id: string): Promise<Response> {
    const postsRepository = getRepository(Post);

    const post = await postsRepository.findOne({ where: { id } });

    if (!post) {
      throw new AppError('Post does not exists.');
    }

    await postsRepository.remove(post);

    const postPath = path.join(uploadConfig.directory, post.image_url);
    const postImageExists = await fs.promises.stat(postPath);

    if (postImageExists) {
      await fs.promises.unlink(postPath);
    }

    return { post };
  }
}

export default DeletePostService;

// // Especificamos o nome e extensão do arquivo a ser deletado

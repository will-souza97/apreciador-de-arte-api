import Like from '../models/like.model';
import { getRepository } from 'typeorm';

interface Request {
  user_id: string;
  post_id: string;
}

class CreateLikeService {
  public async execute({ user_id, post_id }: Request) {
    const likeRepository = getRepository(Like);

    const likeAlreadyExists = await likeRepository.findOne({
      where: { user_id },
    });

    if (likeAlreadyExists) {
      await likeRepository.remove(likeAlreadyExists);

      const likes = await likeRepository.count({ where: { post_id } });

      return { likes };
    }

    const like = likeRepository.create({ user_id, post_id });

    await likeRepository.save(like);

    const likes = await likeRepository.count({ where: { post_id } });

    return { likes };
  }
}

export default CreateLikeService;

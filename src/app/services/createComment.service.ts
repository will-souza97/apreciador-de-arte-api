import { getRepository } from 'typeorm';
import Post from '../models/post.model';
import User from '../models/user.model';
import Comment from '../models/comment.model';
import AppError from '../utils/errors/AppError';

interface Request {
  user_id: string;
  post_id: string;
  comment_content: string;
}

interface Response {
  comment: Comment;
}

class CreateCommentService {
  public async execute({
    user_id,
    post_id,
    comment_content,
  }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    const postsRepository = getRepository(Post);

    const post = await postsRepository.findOne({
      where: { id: post_id },
    });

    if (!post) {
      throw new AppError('Post does not exists.');
    }

    const commentRepository = getRepository(Comment);

    const comment = commentRepository.create({
      user_id,
      post_id,
      comment: comment_content,
    });

    await commentRepository.save(comment);

    return { comment };
  }
}

export default CreateCommentService;

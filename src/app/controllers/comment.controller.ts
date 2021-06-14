import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Comment from '../models/comment.model';
import CreateCommentService from '../services/createComment.service';

class CommentController {
  public async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const commentRepository = getRepository(Comment);

      const comments = await commentRepository.find({ where: { post_id: id } });

      return response.status(200).json(comments);
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }

  public async create(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { id: post_id } = request.body;
    const { comment: comment_content } = request.body;

    try {
      const createComment = new CreateCommentService();

      const comment = await createComment.execute({
        user_id,
        post_id,
        comment_content,
      });

      return response.status(201).json(comment);
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }
}

export default new CommentController();

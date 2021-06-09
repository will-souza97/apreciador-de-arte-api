import { Request, Response } from 'express';
import CreateLikeService from '../services/createLike.service';

class LikeController {
  public async update(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { id: post_id } = request.params;

    try {
      const createLike = new CreateLikeService();

      const likes = await createLike.execute({
        user_id,
        post_id,
      });

      return response.status(201).json(likes);
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }
}

export default new LikeController();

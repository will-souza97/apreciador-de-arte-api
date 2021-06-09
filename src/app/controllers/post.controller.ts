import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Post from '../models/post.model';
import CreatePostService from '../services/createPost.service';
import DeletePostService from '../services/deletePost.service';

class PostController {
  public async index(request: Request, response: Response) {
    const postsRepository = getRepository(Post);

    try {
      const posts = await postsRepository.find();

      return response.status(201).json({ posts });
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }

  public async show(request: Request, response: Response) {
    const { id } = request.user;
    const postsRepository = getRepository(Post);

    try {
      const posts = await postsRepository.find({ user_id: id });

      return response.status(201).json({ posts });
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }

  public async create(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { filename } = request.file;

    try {
      const createPost = new CreatePostService();

      const { post } = await createPost.execute({ user_id, filename });

      return response.status(201).json(post);
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const deletePost = new DeletePostService();

      const { post } = await deletePost.execute(id);

      return response.status(200).json({ 'Post Successfully Deleted': post });
    } catch (error) {
      return response.status(error.statusCode).json({ Error: error.message });
    }
  }
}

export default new PostController();

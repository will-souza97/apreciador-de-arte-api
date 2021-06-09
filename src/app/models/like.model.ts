import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Post from './post.model';
import User from './user.model';

@Entity('likes')
class Like {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  post_id: string;

  @JoinColumn({ name: 'post_id' })
  post: Post;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Like;

import { UserRole } from '@prisma/client';
import { Post } from '../../posts/entities/post.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    uniquepassword: string;
    role: UserRole;
    posts: Post[];
    viewedPosts: Post[];
}

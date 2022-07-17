import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Post {
  readonly id: string;
  readonly content: string;
  readonly timestamp: number;
  readonly duration: string;
  readonly Author?: User | null;
  readonly Screenshotters?: (User | null)[] | null;
  readonly Likers?: (User | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly postAuthorId?: string | null;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email?: string | null;
  readonly followers?: string[] | null;
  readonly following?: string[] | null;
  readonly total_likes?: number | null;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}
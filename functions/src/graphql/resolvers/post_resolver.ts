import {Query, Resolver, Mutation, Arg, Ctx} from "type-graphql";
import {PostInput, Post} from "../schema/post_schema";
import * as PostService from "../../services/post_service";
import {getUserOrThrowError} from "../../services/auth_service";

@Resolver(() => Post)
export class PostResolver {

  @Query(() => [Post])
  async getPosts(
    @Ctx("authorization") authorization: string,
  ): Promise<Post[]> {

    await getUserOrThrowError(authorization);
    return await PostService.list();
  }

  @Query(() => Post, {nullable: true})
  async getPost(
    @Ctx("authorization") authorization: string,
    @Arg("id") id: string,
  ): Promise<Post | undefined> {

    await getUserOrThrowError(authorization);
    return await PostService.getByID(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Ctx("authorization") authorization: string,
    @Arg("input") input: PostInput,
  ): Promise<Post> {

    await getUserOrThrowError(authorization);
    return await PostService.create(input);
  }

  @Mutation(() => Post)
  async updatePost(
    @Ctx("authorization") authorization: string,
    @Arg("id") id: string,
    @Arg("input") input: PostInput,
  ): Promise<Post> {

    await getUserOrThrowError(authorization);
    return await PostService.update(id, input);
  }

}

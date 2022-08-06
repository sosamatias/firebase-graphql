import {PostInput, Post} from "../graphql/schema/post_schema";
import * as PostRepository from "../repository/post_repository";
import {logger} from "firebase-functions/v1";

export async function getByID(id: string): Promise<Post | undefined> {
  const result = await PostRepository.getByID(id);
  logger.info("getByID", {postId: id, result});
  return result;
}

export async function list(): Promise<Post[]> {
  const result = await PostRepository.list();
  logger.info("list", {result});
  return result;
}

export async function create(postInput: PostInput): Promise<Post> {
  if (!postInput.createdAt) {
    postInput.createdAt = new Date().toISOString();
  }
  const result = await PostRepository.create(postInput);
  logger.info("create", {postInput, result});
  return result;
}

export async function update(id: string, postInput: PostInput): Promise<Post> {
  const result = await PostRepository.update(id, postInput);
  logger.info("update", {id, postInput, result});
  return result;
}

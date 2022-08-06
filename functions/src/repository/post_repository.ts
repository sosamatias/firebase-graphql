import * as admin from "firebase-admin";
import {DocumentSnapshot, QuerySnapshot} from "@google-cloud/firestore";
import {PostInput, Post} from "../graphql/schema/post_schema";

export const collection = "posts";

export async function create(postInput: PostInput): Promise<Post> {
  const writeResult = await admin.firestore()
      .collection(collection)
      .add(JSON.parse(JSON.stringify(postInput)));

  return await getByID(writeResult.id) as Post;
}

export async function update(id: string, postInput: PostInput): Promise<Post> {
  await admin.firestore()
      .collection(collection)
      .doc(id)
      .set(JSON.parse(JSON.stringify(postInput)), {merge: true});

  return await getByID(id) as Post;
}

export async function getByID(id: string): Promise<Post | undefined> {
  const result = await admin.firestore()
      .collection(collection)
      .doc(id)
      .get() as DocumentSnapshot<Post>;

  const post = result.data();
  if (post) {
    post.id = result.id;
  }
  return post;
}

export async function list(): Promise<Post[]> {
  const result = await admin.firestore()
      .collection(collection)
      .get() as QuerySnapshot<Post>;

  return result.docs.map((x) => {
    return {...x.data(), id: x.id};
  });
}

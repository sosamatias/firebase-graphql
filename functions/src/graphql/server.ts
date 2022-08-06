import "reflect-metadata";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {PostResolver} from "./resolvers/post_resolver";

export const app = express();


async function main() {

  const schema = await buildSchema({
    resolvers: [
      PostResolver,
    ],
  });

  const server = new ApolloServer({
    schema,
    context: async ({req}) => {
      const authorization = req.headers.authorization || "";
      return {authorization};
    },
  });

  await server.start();
  server.applyMiddleware({app, path: "/", cors: true});
}

main();

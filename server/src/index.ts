import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = 4000;
const pubsub = new PubSub();

const typeDefs = `
  type User {
    id: ID
    name: String
  }
  type Message {
    id: ID
    user: String
    userId: Int
    text: String
  }
  type Query {
    users: [User]
  }
  type Query {
    messages: [Message]
  }
  type Mutation {
    addUser(name: String): ID
  }
  type Mutation {
    postMessage(user: String, userId: Int, text: String): Message
  }
  type Subscription {
    message: Message
  }
`;

const users = [];
const messages = [];
const subscribers = [];

const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
  Query: {
    messages: () => messages
  },
  Mutation: {
    postMessage: (parent, { user, userId, text }) => {
      const id = messages.length;
      const data: { id: number; user: string; userId: number; text: string } = {
        id,
        user,
        userId,
        text,
      };
      messages.push(data);
      subscribers.forEach((fn) => fn());
      return data;
    },
    addUser: (parent, { name }) => {
      const id = users.length;
      const data: { id: number; name: string } = {
        id,
        name,
      };
      users.push(data);
      return id;
    },
  },
  Subscription: {
    message: {
      subscribe: () => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(() =>
          pubsub.publish(channel, { message: messages[messages.length - 1] })
        );
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server)
);

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql'
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export const ADD_USER = gql`
  mutation AddUser($name: String!) {
    addUser(name: $name)
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      user
      userId
      text
    }
  }
`;

export const SUBSCRIBE_MESSAGES = gql`
  subscription {
    message {
      id
      user
      userId
      text
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation PostMessage($user: String!, $userId: Int!, $text: String!) {
    postMessage(user: $user, userId: $userId, text: $text) {
      user
      userId
      text
    }
  }
`;

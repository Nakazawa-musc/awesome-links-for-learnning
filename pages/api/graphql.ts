import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { schema } from '../../graphql/schema';
import { createContext } from '../../graphql/context';
import { resolvers } from '../../graphql/resolvers'
import Cors from 'micro-cors'

const cors = Cors()

const apolloServer = new ApolloServer({
  context: createContext,
  schema,
  resolvers,
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { createContext } from '../../grahpql/context'
import { resolvers } from '../../grahpql/resolvers'
import { typeDefs } from '../../grahpql/schema'

const cors = Cors()

// スキーマとリゾルバをパラメータとして、新しいapolloServerインスタンスを作成。
// データベースからデータを返すようにコンテキストを含める。
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
})

const startServer = apolloServer.start()

// リクエストとレスポンスオブジェクトを受け取る。
export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer

  await apolloServer.createHandler({
    // GraphQL APIのエンドポイント
    path: '/api/graphql',
  })(req, res)
})

// すべてのAPIルートは、デフォルトの設定を変更するためにconfigオブジェクトをエクスポートすることができる。
export const config = {
  api: {
    // Bodyの解析はGraphQLで処理されるため、ここでは無効。
    bodyParser: false,
  },
}

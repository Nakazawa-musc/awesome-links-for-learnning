import { ApolloClient, InMemoryCache } from '@apollo/client'

// ApolloClientのインスタンスを作成し、uriとcacheフィールドを持つ設定オブジェクトを渡す。
// uriフィールド: 対話するGraphQLエンドポイントを指定します。これは、アプリをデプロイする際に本番用URLに変更されます。
// cacheフィールド: InMemoryCacheのインスタンスで、Apollo Clientはクエリ結果を取得した後にキャッシュするためにこれを使用します。
const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
})

export default apolloClient

import { objectType, extendType } from 'nexus'
import { User } from './User'


// オブジェクトを引数として取り、そこでオブジェクトタイプの名前と異なるフィールドを指定します。
export const Link = objectType({
  name: 'Link',
  definition(t) {
    // 各フィールドのタイプを指定。
    t.string('id')
    t.string('title')
    t.string('url')
    t.string('description')
    t.string('imageUrl')
    t.string('category')
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.link
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .users()
      },
    })
  },
})

// extendType() 関数を使って、クエリを作成。
// nonNull: クライアントが常にこのフィールドの値を取得することを指定します。Nexus では、すべての「出力タイプ」（フィールドが返すタイプ）は、デフォルトで NULL 可能です。
// list: このクエリがリストを返すことを指定します。
// field(): 2つの引数を取る関数です。
//   - フィールドの名前。この場合、最初に作成したスキーマと同様、クエリの名前は "links" となります。
//   - リゾルバ関数と一緒に、クエリの返される型を指定するオブジェクト。リゾルバ関数では、コンテキストからプリズマにアクセスし、findMany()関数を使ってデータベースのLinkテーブルのすべてのリンクを返しています。
export const LinksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('links', {
      type: 'Link',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.link.findMany()
      },
    })
  },
})

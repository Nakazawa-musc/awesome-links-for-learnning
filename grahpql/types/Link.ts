import { objectType, extendType, intArg, stringArg } from 'nexus'
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
export const LinksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('links', {
      type: 'Response',
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null

        if (args.after) {
          // check if there is a cursor as the argument
          queryResults = await ctx.prisma.link.findMany({
            take: args.first, // the number of items to return from the database
            skip: 1, // skip the cursor
            cursor: {
              id: args.after, // the cursor
            },
          })
        } else {
          // if no cursor, this means that this is the first request
          //  and we will return the first items in the database
          queryResults = await ctx.prisma.link.findMany({
            take: args.first,
          })
        }
        // if the initial request returns links
        if (queryResults.length > 0) {
          // get last element in previous result set
          const lastLinkInResults = queryResults[queryResults.length - 1]
          // cursor we'll return in subsequent requests
          const myCursor = lastLinkInResults.id

          // query after the cursor to check if we have nextPage
          const secondQueryResults = await ctx.prisma.link.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
            orderBy: {
              id: 'asc',
            },
          })
          // return response
          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first, //if the number of items requested is greater than the response of the second query, we have another page
            },
            edges: queryResults.map(link => ({
              cursor: link.id,
              node: link,
            })),
          }

          return result
        }
        //
        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        }
      },
    })
  },
})

// string 型のカーソルフィールドと、Link オブジェクトを返すノードフィールドを含む。
export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.string('cursor')
    t.field('node', {
      type: Link,
    })
  },
})

// string 型の endCursor フィールドと hasNextPage boolean を含む。
export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('endCursor')
    t.boolean('hasNextPage')
  },
})

// LinksQueryから返されるオブジェクトタイプ。
// これはpageInfoオブジェクト・タイプとEdgeタイプのarrayであるedgesを含んでいる。
export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo })
    t.list.field('edges', {
      type: Edge,
    })
  },
})

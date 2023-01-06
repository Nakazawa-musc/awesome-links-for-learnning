import { enumType, objectType } from 'nexus'
import { Link } from './Link'

// オブジェクトを引数として取り、そこでオブジェクトタイプの名前と異なるフィールドを指定します。
export const User = objectType({
  name: 'User',
  definition(t) {
    // 各フィールドのタイプを指定。
    t.string('id')
    t.string('name')
    t.string('email')
    t.string('image')
    t.field('role', { type: Role })
    t.list.field('bookmarks', {
      type: Link,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .bookmarks()
      },
    })
  },
})

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
})
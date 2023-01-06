// リンククエリ用のリゾルバ関数。
// 各クエリやミューテーションの実装を定義するためのオブジェクトです。クエリオブジェクトの中の関数は、スキーマで定義されたクエリの名前と一致しなければなりません。
export const resolvers = {
  Query: {
    links: () => {
      // リンクリゾルバ関数はオブジェクトの配列を返し、各オブジェクトの型はリンク。
      return [
        {
          category: 'Open Source',
          description: 'Fullstack React framework',
          id: '8a9020b2-363b-4a4f-ad26-d6d55b51bqes',
          imageUrl: 'https://nextjs.org/static/twitter-cards/home.jpg',
          title: 'Next.js',
          url: 'https://nextjs.org',
        },
        {
          category: 'Open Source',
          description: 'Next Generation ORM for TypeScript and JavaScript',
          id: '2a3121b2-363b-4a4f-ad26-d6c35b41bade',
          imageUrl: 'https://www.prisma.io/images/og-image.png',
          title: 'Prisma',
          url: 'https://prisma.io',
        },
        {
          category: 'Open Source',
          description: 'GraphQL implementation',
          id: '2ea8cfb0-44a3-4c07-bdc2-31ffa135ea78',
          imageUrl: 'https://www.apollographql.com/apollo-home.jpg',
          title: 'Apollo GraphQL',
          url: 'https://apollographql.com',
        },
      ]
    },
  },
}
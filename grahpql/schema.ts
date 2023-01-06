// graphql/schema.ts

import { gql } from 'apollo-server-micro'

// gqlタグは、スキーマ定義などのGraphQL文字列をラッピングするためのテンプレートリテラルのタグです。
// シンタックスハイライトを有効にし、Apolloライブラリが操作やスキーマを扱う際に期待する形式にGraphQL文字列を変換します。
export const typeDefs = gql`
type Link {
id: String
title: String
description: String
url: String
category: String
imageUrl: String
users: [String]
}

# すべてのリンクを返すクエリ
type Query {
links: [Link]!
}
`

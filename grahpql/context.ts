import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma'

// Context型を作成し、PrismaClient型をそれにアタッチ。
export type Context = {
  prisma: PrismaClient
}

// libディレクトリに作成されたprismaインスタンスを返します。
export async function createContext({ req, res }): Promise<Context> {
  return {
    prisma,
  }
}

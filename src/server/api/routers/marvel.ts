import fetcher from '@/lib/fetcher'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

const ts = process.env.MARVEL_TS ?? ''
const apikey = process.env.MARVEL_PUBLIC_KEY ?? ''

// hash = md5(ts+privateKey+publicKey)
// https://cryptii.com/pipes/md5-hash
const hash = process.env.MARVEL_HASH ?? ''

const baseUrl = 'https://gateway.marvel.com/v1/public'
const authentication = `?ts=${ts}&apikey=${apikey}&hash=${hash}`

const testUrl = `${baseUrl}/comics${authentication}`

const searchCharactersUrl = (nameStartsWith: string) =>
  `${baseUrl}/characters${authentication}&nameStartsWith=${nameStartsWith}`

interface Character {
  id: string
  name: string
}

interface SearchCharactersResponse {
  status: string
  data: {
    results: Character[]
  }
}

export const marvelRouter = createTRPCRouter({
  test: publicProcedure.query(async () => {
    return await fetcher(testUrl)
  }),
  searchCharacters: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const { status, data } = await fetcher<SearchCharactersResponse>(
        searchCharactersUrl(input.text)
      )
      if (status === 'Ok') {
        return data.results
      }
      return []
    }),
})

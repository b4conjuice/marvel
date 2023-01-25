import { useState } from 'react'
import { type NextPage } from 'next'

import Page from '@/components/page'
import Main from '@/components/design/main'
import Title from '@/components/design/title'
import LoadingIcon from '@/components/loading-icon'
import { api } from '@/lib/api'
import useForm from '@/lib/useForm'
import Button from '@/components/design/button'

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState('')

  const { values, handleChange, handleSubmit, isSubmitting, dirty } = useForm({
    initialValues: { text: searchText },
    onSubmit: (newValues, { setSubmitting }) => {
      const { text: newText } = newValues
      setSearchText(newText as string)
      setSubmitting(false)
    },
  })
  const { text } = values
  const searchCharactersQuery = api.marvel.searchCharacters.useQuery({
    text: searchText,
  })

  const { data: characters, isLoading } = searchCharactersQuery

  return (
    <Page>
      <Main className='flex flex-col space-y-4 p-4'>
        <Title>build your team</Title>
        <form className='space-y-4'>
          <input
            className='block w-full text-center text-cobalt'
            type='text'
            placeholder='text'
            value={text}
            name='text'
            onChange={handleChange}
          />
          <Button
            type='submit'
            onClick={handleSubmit}
            disabled={!dirty || isSubmitting}
          >
            search
          </Button>
        </form>
        {searchText ? (
          isLoading ? (
            <LoadingIcon className='h-16 w-16 animate-spin-slow text-blue-700 dark:text-blue-200' />
          ) : characters?.length && characters?.length > 0 ? (
            <ul>
              {searchCharactersQuery?.data?.map(character => (
                <li key={character.id}>{character.name}</li>
              ))}
            </ul>
          ) : (
            <p>no results</p>
          )
        ) : null}
      </Main>
    </Page>
  )
}

export default Home

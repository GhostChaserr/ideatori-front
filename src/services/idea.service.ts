import { useMutation, useQuery } from '@apollo/client'
import { CreateIdeaMutation, IdeaQuery, IdeasQuery } from 'gql/idea'
import { IdeaQueryResult, IdeasQueryResult } from './types/idea.types'

export const useIdeaQuery = (ideaId: string): IdeaQueryResult  => {
  const { loading, data, error  } = useQuery(IdeaQuery, { variables: { ideaId } })
  return {
    loading,
    data,
    error,
    idea: (data && data.idea) || {},
  }
}

export const useIdeasQuery = ({ page, limit }: { page: number; limit: number }): IdeasQueryResult => {
  const { loading, data, error } = useQuery(IdeasQuery, {
    variables: { input: { page, limit } }
  })
  return {
    loading,
    data,
    error,
    total: (data && data.ideas.total) || undefined,
    ideas: (data && data.ideas.ideas) || []
  }
}

export const useCreateIdea = () => useMutation(CreateIdeaMutation)[0]

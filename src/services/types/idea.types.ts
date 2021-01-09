export type IdeasQueryResult = {
  ideas: object[]
  total: number
  error: any
  loading: boolean,
  data: object
}

export type IdeaQueryResult = {
  loading: boolean
  idea: object
  error: object | undefined
  data: object
}
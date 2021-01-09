export type IdeaDrawerProps = {
  update?: boolean
  data?: object
}

export type CreateIdeaPayload = {
  name: string
  summary: string
  keywordsString: string
  category: string
}
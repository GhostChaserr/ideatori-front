
interface IIdea {
  name: string
  summary: string
  keywords: string[]
}

export type IdeaProps = {
  idea: IIdea
}
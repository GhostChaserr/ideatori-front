import CommentInput from 'components/CommentInput'
import React from 'react'
import { useIdeaQuery, useIdeasQuery } from 'services/idea.service'

const Ideas = () => {
  return (
    <div>
      <CommentInput serviceId='5ff992c49765b90da71dfddc' service='Idea' />
    </div>
  )
}

export default Ideas

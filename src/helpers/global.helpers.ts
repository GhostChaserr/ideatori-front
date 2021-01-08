const isObject = (obj: any) => {
  const type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}

const formatErrors = (error: any): { message: string } => {
  if (!isObject(error) || error.graphQLErrors.length < 0) return { message: '' }

  // Check if network error exists...
  const { networkError } = error

  // Server is down
  if (networkError) return { message: 'server is down' }


  // Different error
  const message = error.graphQLErrors[0].message


  return { message }
}

export default { formatErrors }


export interface Config {
  API_URL: string
}


let config: Config = {
  API_URL: 'http://localhost:3000'
}

switch (process.env.NODE_ENV) {
  case 'development':
    config = {
      API_URL: 'http://localhost:3000'
    }
    break
  default:
    break
}


export default config
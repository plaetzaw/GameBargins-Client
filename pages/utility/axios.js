import axios from 'axios'

const connection = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  timeout: 10000,
  withCredentials: true
  // headers: {'X-Custom-Header': 'foobar'}
})

export default connection

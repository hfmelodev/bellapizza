import { env } from '@/env'
import axios from 'axios'

export const API = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (['development', 'test'].includes(env.VITE_NODE_ENV)) {
  // Adiciona um delay de 2 segundos antes de cada requisição
  API.interceptors.request.use(async config => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    return config
  })
}

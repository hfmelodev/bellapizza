import { env } from '@/env'
import axios from 'axios'

export const API = axios.create({
  baseURL: env.VITE_API_URL,
})

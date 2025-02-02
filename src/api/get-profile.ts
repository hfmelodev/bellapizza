import { API } from '@/lib/axios'

interface GetProfileFormType {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await API.get<GetProfileFormType>('/me')

  return response.data
}

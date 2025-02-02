import { API } from '@/lib/axios'

export interface GetManagedRestaurantFormType {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await API.get<GetManagedRestaurantFormType>(
    '/managed-restaurant'
  )

  return response.data
}

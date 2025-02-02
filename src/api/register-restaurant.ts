import { API } from '@/lib/axios'

export interface RegisterRestaurantFormType {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurantFormType) {
  await API.post('/restaurants', { restaurantName, managerName, email, phone })
}

import { API } from '@/lib/axios'

interface UpdateProfileFormType {
  name: string
  description: string | null
}

export async function updateProfile({
  description,
  name,
}: UpdateProfileFormType) {
  await API.put('/profile', { name, description })
}

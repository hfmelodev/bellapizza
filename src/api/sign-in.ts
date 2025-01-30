import { API } from '@/lib/axios'

export interface SignInFormType {
  email: string
}

export async function singIn({ email }: SignInFormType) {
  await API.post('/authenticate', { email })
}

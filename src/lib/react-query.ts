import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Simplesmente desabilita o refetchOnWindowFocus que significa que ele nao ira refetchar os dados quando a janela for focada
      refetchOnWindowFocus: false,
    },
  },
})

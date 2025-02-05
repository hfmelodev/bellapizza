import { API } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
}

export interface GetOrdersFormType {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({ pageIndex }: GetOrdersQuery) {
  const response = await API.get<GetOrdersFormType>('/orders', {
    params: {
      pageIndex,
    },
  })

  return response.data
}

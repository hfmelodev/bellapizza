import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

import { cancelOrder } from '@/api/cancel-order'
import type { GetOrdersFormType } from '@/api/get-orders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  // Controlando o detalhe do pedido aberto ou fechado
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const queryClient = useQueryClient()
  // Cancelando o pedido e atualizando o cache
  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      // Busca os dados que estavam no cache antes da atualização
      const ordersListCache = queryClient.getQueriesData<GetOrdersFormType>({
        queryKey: ['orders'],
      })

      // Atualiza o cache da query "orders"
      ordersListCache.map(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return
        }
        // Atualiza o cache com o pedido cancelado
        queryClient.setQueryData<GetOrdersFormType>(cacheKey, {
          ...cacheData,
          // Atualiza o status do pedido cancelado
          orders: cacheData.orders.map(order => {
            if (order.orderId === orderId) {
              return { ...order, status: 'canceled' }
            }

            return order
          }),
        })
      })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          {/* FIXME: Componente de detalhes do pedido */}
          <OrderDetails orderId={order.orderId} open={isDetailOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt), {
          addSuffix: true,
          locale: ptBR,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {order.total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="size-3" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          // Se o pedido estiver pendente ou processando, ele pode ser cancelado
          disabled={!['pending', 'processing'].includes(order.status)}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}

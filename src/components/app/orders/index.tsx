import { getOrders } from '@/api/get-orders'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router'
import { z } from 'zod'
import { OrderTableFilter } from './order-table-filter'
import { OrderTableRow } from './order-table-row'
import { Pagination } from './pagination'

export function Orders() {
  // Hook que permite alterar os parâmetros da URL
  const [searchParams, setSearchParams] = useSearchParams()

  // FIXME: Aplica a validação e transformação ao valor extraído da URL.
  const pageIndex = z.coerce
    .number() // Converte o valor obtido para um número, mesmo que seja uma string.
    .transform(page => page - 1) // Transforma o número para um índice baseado em zero (ex: página 1 → índice 0).
    .parse(searchParams.get('page') ?? '1') // Obtém o parâmetro 'page' da URL; se não existir, usa '1' como padrão.

  const { data: result } = useQuery({
    // Toda vez que a função depender de um parâmetro, esse parametro deve ser passado no array de dependências da queryKey
    queryKey: ['orders', pageIndex],
    queryFn: () => getOrders({ pageIndex }),
  })

  async function handlePaginate(pageIndex: number) {
    setSearchParams(state => {
      state.set('page', String(pageIndex + 1))

      return state
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          {/* FIXME: Componente de filtro */}
          <OrderTableFilter />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]" />
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[100px]" />
                  <TableHead className="w-[100px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {result?.orders.map(order => (
                  // FIXME: Componente de linha de pedido
                  <OrderTableRow key={order.orderId} order={order} />
                ))}
              </TableBody>
            </Table>
          </div>

          {result && (
            //FIXME: Componente de paginação de pedidos
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result.meta.pageIndex}
              perPage={result.meta.perPage}
              totalCount={result.meta.totalCount}
            />
          )}
        </div>
      </div>
    </>
  )
}

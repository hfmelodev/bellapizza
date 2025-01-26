import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { OrderTableFilter } from './order-table-filter'
import { OrderTableRow } from './order-table-row'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />

      <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

      <div className="space-y-2.5">
        {/* Componente de filtro */}
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
              {Array.from({ length: 10 }).map((_, i) => {
                // Componente com a lista de pedidos
                return <OrderTableRow key={i} />
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

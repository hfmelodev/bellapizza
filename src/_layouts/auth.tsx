import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Pizza className="size-6 text-rose-800" />
          <span className="font-semibold">BellaPizza</span>
        </div>

        <footer className="text-sm">
          Painel do parceiro &copy;{' '}
          <span className="text-rose-800 font-medium">
            BellaPizza {new Date().getFullYear()}
          </span>
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}

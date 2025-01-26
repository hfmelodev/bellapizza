import { Building, ChevronDown, LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          BellaPizza
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Hilquias Ferreira Melo</span>
          <span className="text-xs font-normal text-muted-foreground">
            hilquiasfmelo@gmail.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Building className="size-4" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
          <LogOut className="size-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { LaptopMinimal, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from './theme-provider'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === 'light' && (
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}

          {theme === 'dark' && (
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}

          {theme === 'system' && (
            <LaptopMinimal className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}

          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="size-4" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="size-4" />
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <LaptopMinimal className="size-4" />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

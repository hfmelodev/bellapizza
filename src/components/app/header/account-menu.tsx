import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, Loader2, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { StoreProfileDialog } from './store-profile-dialog'

export function AccountMenu() {
  // Busca da API os dados do usuário
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Number.POSITIVE_INFINITY, // Nunca expira os dados do usuário
  })

  // Busca da API os dados da loja
  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Number.POSITIVE_INFINITY, // Nunca expira os dados da loja
    })

  const navigate = useNavigate()
  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true }) // Redireciona para a tela de login e proible a navegação de volta
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            ) : (
              <>
                <span className="text-sm font-semibold">{profile?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* FIXME: Botão que faz aparecer o dialog de perfil da loja */}
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">
              <Building className="size-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            className="text-rose-500 dark:text-rose-400 cursor-pointer"
            disabled={isSigningOut}
            onClick={() => signOutFn()}
            onSelect={event => {
              event.preventDefault()
              signOutFn()
            }}
          >
            {isSigningOut ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Encerrando sessão...</span>
              </>
            ) : (
              <>
                <LogOut className="size-4" />
                <span>Sair</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* FIXME: Dialog de perfil da loja */}
      <StoreProfileDialog />
    </Dialog>
  )
}

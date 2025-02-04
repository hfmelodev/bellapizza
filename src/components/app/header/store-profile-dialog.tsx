import {
  type GetManagedRestaurantFormType,
  getManagedRestaurant,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RefreshCcw } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const storeProfileSchema = z.object({
  name: z.string().min(1, {
    message: 'O nome da loja e obrigatório.',
  }),
  description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  // Busca da API os dados da loja
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Number.POSITIVE_INFINITY, // Nunca expira os dados da loja
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    // Define os valores iniciais dos campos com os dados da loja atual caso existam
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  const queryClient = useQueryClient()
  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { name, description }) {
      // Busca os dados que estavam no cache antes da atualização
      const cached = queryClient.getQueryData<GetManagedRestaurantFormType>([
        'managed-restaurant',
      ])

      if (cached) {
        // Atualiza o cache da query "managed-restaurant"
        queryClient.setQueryData<GetManagedRestaurantFormType>(
          ['managed-restaurant'],
          {
            ...cached, // Mantém os dados antigos
            name, // Atualiza o cache com o nome
            description, // Atualiza o cache com a descrição
          }
        )
      }
    },
  })

  async function handleSubmitForm(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Algo deu errado, tente novamente.')

      console.log(error)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-3" htmlFor="name">
              Nome
            </Label>
            <div className="col-span-3 flex flex-col gap-2">
              <Input id="name" {...register('name')} />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            type="submit"
            className="disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <RefreshCcw className="animate-spin" /> Atualizando dados...
              </>
            ) : (
              <>
                <RefreshCcw className="size-4" /> Atualizar
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

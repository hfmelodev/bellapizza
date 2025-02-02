import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { LoaderPinwheel } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

const signUpFormSchema = z.object({
  restaurantName: z.string().min(1, {
    message: 'O nome do restaurante é obrigatório',
  }),
  managerName: z.string().min(1, {
    message: 'O nome do gerente é obrigatório',
  }),
  phone: z.string().min(1, {
    message: 'O telefone é obrigatório',
  }),
  email: z.string().email({
    message: 'O email é obrigatório',
  }),
})

type SignUpFormType = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  })

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpFormType) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success('Restaurante cadastrado com sucesso!')

      // Redireciona para a tela de login com o e-mail do restaurante como parâmetro na URL
      await navigate(`/sign-in?email=${data.email}`)
    } catch (err) {
      toast.error('Algo deu errado, tente novamente.')

      console.error(err)
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button variant="outline" className="absolute top-8 right-8" asChild>
          <Link to="/sign-in">Realizar login</Link>
        </Button>

        <div className="flex w-96 flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta gratuitamente!
            </h1>

            <p className="text-muted-foreground text-sm">
              Seja um parceiro e comece a gerenciar suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome de estabelecimento</Label>
              <Input id="restaurantName" {...register('restaurantName')} />
              {errors.restaurantName && (
                <span className="text-xs text-red-500">
                  {errors.restaurantName.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Nome do gerente</Label>
              <Input id="managerName" {...register('managerName')} />
              {errors.managerName && (
                <span className="text-xs text-red-500">
                  {errors.managerName.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" {...register('phone')} />
              {errors.phone && (
                <span className="text-xs text-red-500">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <Button
              className="w-full flex items-center font-bold"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderPinwheel className="animate-spin" /> Criando sua
                  conta...
                </>
              ) : (
                'Finalizar cadastro'
              )}
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você aceita nossos{' '}
              <a href="#" className="underline underline-offset-2">
                Termos de uso
              </a>{' '}
              e{' '}
              <a href="#" className="underline underline-offset-2">
                Política de Privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { singIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { LoaderPinwheel } from 'lucide-react'

const signInFormSchema = z.object({
  email: z.string().email({
    message: 'O email é obrigatório',
  }),
})

type SignInFormType = z.infer<typeof signInFormSchema>

export function SignIn() {
  // Recuperando o e-mail fornecido na URL
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      // Definindo o valor inicial do campo de email caso ele seja fornecido na URL
      email: searchParams.get('email') || '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: singIn,
  })

  async function handleSubmitForm(data: SignInFormType) {
    try {
      await authenticate({
        email: data.email,
      })

      toast.success('Enviamos um link de autenticação para seu e-mail.')
    } catch (error) {
      toast.error('Algo deu errado, tente novamente.')

      console.log(error)
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button variant="outline" className="absolute top-8 right-8" asChild>
          <Link to="/sign-up">Cria conta gratuita</Link>
        </Button>

        <div className="flex w-96 flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>

            <p className="text-muted-foreground text-sm">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
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
              disabled={!isSubmitting}
            >
              {!isSubmitting ? (
                <>
                  <LoaderPinwheel className="animate-spin" /> Verificando seus
                  dados...
                </>
              ) : (
                'Acessar painel'
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

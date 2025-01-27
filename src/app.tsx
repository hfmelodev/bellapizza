import { Route, Routes } from 'react-router'
import { AppLayout } from './_layouts/app'
import { AuthLayout } from './_layouts/auth'
import { Dashboard } from './components/app/dashboard'
import { Orders } from './components/app/orders'
import { NotFound } from './not-found'
import { SignIn } from './pages/sign-in'
import { SignUp } from './pages/sign-up'

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      <Route path="sign-in" element={<AuthLayout />}>
        <Route index element={<SignIn />} />
      </Route>

      <Route path="sign-up" element={<AuthLayout />}>
        <Route index element={<SignUp />} />
      </Route>

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

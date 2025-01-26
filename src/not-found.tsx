import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

export function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-r from-primary-100 via-prifrom-primary-200 to-prifrom-primary-300 overflow-hidden">
      <motion.h1
        className="text-6xl font-bold text-prifrom-primary-800 mb-8 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        404
      </motion.h1>

      <motion.div
        className="text-3xl text-primary from-primary mb-12 z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        Oops! Página não encontrada
      </motion.div>

      <motion.div
        className="text-xl from-primary mb-12 text-center max-w-md z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Parece que você se perdeu no oceano digital. Não se preocupe, vamos te
        guiar de volta!
      </motion.div>

      <motion.button
        className="px-6 py-3 cursor-pointer border from-primary text-foreground rounded-full font-semibold text-lg shadow-lg hover:bg-primary/5 transition duration-300 z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      >
        <Link to="/">Voltar para a página inicial</Link>
      </motion.button>

      {/* Efeitos de confetti como plano de fundo */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        {[...Array(150)].map((_, i) => (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            className="absolute bg-primary rounded-full"
            style={{
              // biome-ignore lint/style/useTemplate: <explanation>
              width: Math.random() * 6 + 1 + 'px',
              // biome-ignore lint/style/useTemplate: <explanation>
              height: Math.random() * 6 + 1 + 'px',
              // biome-ignore lint/style/useTemplate: <explanation>
              top: Math.random() * 100 + '%',
              // biome-ignore lint/style/useTemplate: <explanation>
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

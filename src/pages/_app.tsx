// Componente geral da aplicação, é utilizado para padronizar formato.
import React from 'React'
import type { AppProps } from 'next/app'

import Head from 'next/app'

import { AnimatePresence as Animate } from 'framer-motion'

import '../styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Animate exitBeforeEnter>
            <Component {...pageProps} />
        </Animate>
    )
}

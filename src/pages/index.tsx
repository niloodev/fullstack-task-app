//// Página de autenticação | inicial
import React from 'React'

import { motion } from 'framer-motion'
import Head from 'next/head'

const Home: React.FC = () => {
    return (
        <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut' }}
        >
            <Head>
                <title>Log-in | niloodev</title>

                <meta
                    name="description"
                    content="FullStack Task App developed by niloodev"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <link rel="icon" href="./static/favicon.ico" />
            </Head>

            <footer></footer>
        </motion.div>
    )
}

export default Home

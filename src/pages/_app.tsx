/* eslint-disable @typescript-eslint/no-unused-vars */

// React import.
import React, { useEffect } from 'react'

// Import type from Next.
import type { AppProps } from 'next/app'

// Animate Presence to entrance and exit animations.
import { AnimatePresence } from 'framer-motion'

// Global CSS import.
import GlobalStyle from '../styles/global-style'

// 🐸: Import the theme palette from styles, and them the Styled Components provider.
import themePalette from '../styles/theme-palette'
import { ThemeProvider } from 'styled-components'

// Import theme provider from Material UI, integrate it theme palette.
import {
    ThemeProvider as MUI_ThemeProvider,
    createTheme,
} from '@mui/material/styles'
const MUI_colorsVar = createTheme(themePalette) // 🐸: Just converting the palette to a object that Material UI
// can understand.

// The component responsable of setting authentication configs.
import FirebaseAuthComponent from '../lib/firebase/firebase-auth-component'

// Import redux store already with the Next + React/Redux wrapper.
import withWrapper from '../lib/redux/store/store'

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        // 🐸: Right now, they're using the same object theme for the two theme providers distributed
        // across all application - I dont know if this is the best solution, but its working. If someone
        // wants to feedback this with better integrations, feel free to give a touch.
        <ThemeProvider theme={themePalette}>
            {/* MUI theme provider. */}
            <MUI_ThemeProvider theme={MUI_colorsVar}>
                {/* Animate the enter and exit from pages. */}
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.pathname} />
                </AnimatePresence>
                {/* Global style component generated by Styled Components.*/}
                <GlobalStyle />
                {/* Auth component that provides authUser and other functions. */}
                <FirebaseAuthComponent />
            </MUI_ThemeProvider>
        </ThemeProvider>
    )
}

export default withWrapper.withRedux(MyApp)

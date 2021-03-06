/* eslint-disable @typescript-eslint/no-unused-vars */

// React import.
import React, { useEffect } from 'react'

// Import type from Next.
import type { AppProps } from 'next/app'

// Animate Presence to entrance and exit animations.
import { AnimatePresence } from 'framer-motion'

// Notistack is a snackbar package of Material UI.
import { SnackbarProvider } from 'notistack'

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

// Localization provider from Material UI
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

// The component responsable of setting authentication configs.
import FirebaseAuthComponent from '../lib/firebase/firebase-auth-component'

// The component responsable of syncing Redux state and Notistack provider.
import SnackbarHandler from '../tools/snackbar-handler'

// The component responsable of setting declarative modals.
import ApplicationModals from '../styles/components/modal-components'

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
                {/* MUI localization provider. */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {/* Snackbar imperative management provider. */}
                    <SnackbarProvider
                        maxSnack={1}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        {/* Animate the enter and exit from pages. */}
                        <AnimatePresence exitBeforeEnter>
                            <Component {...pageProps} key={router.pathname} />
                        </AnimatePresence>
                        {/* Global style component generated by Styled Components.*/}
                        <GlobalStyle />
                        {/* Declarative way to do modal exibition. */}
                        <ApplicationModals />
                        {/* Declarative way to do snackbar exibition. */}
                        <SnackbarHandler />
                        {/* Auth component that syncs Firebase with Redux. */}
                        <FirebaseAuthComponent />
                    </SnackbarProvider>
                </LocalizationProvider>
            </MUI_ThemeProvider>
        </ThemeProvider>
    )
}

export default withWrapper.withRedux(MyApp)

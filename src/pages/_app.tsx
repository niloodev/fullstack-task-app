///////////////////////////////////// login page

// react import
import React from 'react'

// type 'AppProps" from next/app
import type { AppProps } from 'next/app'

// framer-motion <3 (dinamic animate framework)
import { AnimatePresence as Animate } from 'framer-motion'

// global css import
import GlobalStyle from '../styles/global'

// import theme provider from styled components, to share theme with all components.
import { ThemeProvider } from 'styled-components'
import colorsVar from '../styles/colors-var'

// import theme provider from material-ui, integrate it with theme object used by styled components
import {
    ThemeProvider as MUI_ThemeProvider,
    createTheme,
} from '@mui/material/styles'

const MUI_colorsVar = createTheme(colorsVar)

// material-ui variant module called notistack, it makes popups appear in a imperative way, not needing to
// controlate the state of the component or something like that.
import { SnackbarProvider } from 'notistack'

// import auth provider
import { AuthUserProvider } from '../lib/firebase-auth-provider'

// now, they're using the same object for all the theme three distributed across all application - i dont know if this
// is the best solution of the problem, but its working | if someone want to feedback this with better integrations, feel
// free to give a touch.
// export MyApp "global" / main component, that includes other pages in <Component {...pageProps} />.

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={colorsVar}>
            <MUI_ThemeProvider theme={MUI_colorsVar}>
                <SnackbarProvider preventDuplicate={false} maxSnack={1}>
                    <AuthUserProvider>
                        <Animate exitBeforeEnter>
                            <Component {...pageProps} />
                        </Animate>
                    </AuthUserProvider>
                </SnackbarProvider>
                <GlobalStyle />
            </MUI_ThemeProvider>
        </ThemeProvider>
    )
}

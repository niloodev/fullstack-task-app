// Global CSS of application.
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    /* ------------- Font "Work Sans" from Google Fonts. */
    @font-face {
        font-family: "Work Sans";
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/worksans/v16/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K8nQBi8Jpg.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* CSS variables definition. */
    :root {
        /* Colors */
        --color-primary: ${props => props.theme.palette.primary.main};
        --color-secondary: ${props => props.theme.palette.secondary.main};
        --color-warning: ${props => props.theme.palette.warning.main};
        --color-error: ${props => props.theme.palette.error.main};

        /* Font */
        --font: ${props => props.theme.typography.fontFamily};
    }

    /* ------------- HTML and main tags definition. */
    html,
    body,
    #__next {
        width: 100%;
        height: 100%; min-height: 450px;

        margin: 0;
        padding: 0;

        font-family: var(--font);

        background-color: var(--color-primary);
    }

    /* Scrollbar customization. */
    ::-webkit-scrollbar {
        width: 2px;
    }

    ::-webkit-scrollbar-track {
        background-color: var(--color-secondary);
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--color-warning);
        border-radius: 5px;
    }
`

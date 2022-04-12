// Global CSS of application.
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    /* ------------- Font "Work Sans" from Google Fonts. */
    @font-face {
        font-family: 'Exo';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/exo/v18/4UaZrEtFpBI4f1ZSIK9d4LjJ4mE3OwRmOw.woff2) format('woff2');
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

        /* Patterns */
        --gradient-primary: repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 25px,
            hsla(29, 69%, 89%, 0.08) 25px,
            hsla(29, 69%, 89%, 0.08) 27px,
            transparent 27px,
            transparent 51px
        ),
        repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 25px,
            hsla(29, 69%, 89%, 0.08) 25px,
            hsla(29, 69%, 89%, 0.08) 27px,
            transparent 27px,
            transparent 51px
        ),
        repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 50px,
            hsla(156, 85%, 58%, 0.08) 50px,
            hsla(156, 85%, 58%, 0.08) 52px,
            transparent 52px,
            transparent 102px
        ),
        repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 50px,
            hsla(156, 85%, 58%, 0.08) 50px,
            hsla(156, 85%, 58%, 0.08) 52px,
            transparent 52px,
            transparent 102px
        ),
        repeating-linear-gradient(
            0deg,
            hsla(81, 81%, 82%, 0.08) 0px,
            hsla(81, 81%, 82%, 0.08) 2px,
            transparent 2px,
            transparent 102px
        ),
        repeating-linear-gradient(
            90deg,
            hsla(81, 81%, 82%, 0.08) 0px,
            hsla(81, 81%, 82%, 0.08) 2px,
            transparent 2px,
            transparent 102px
        ),
        linear-gradient(90deg, var(--color-error), var(--color-warning));
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

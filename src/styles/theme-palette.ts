// 🐸: This object represents all colors and CSS definitions, it will be applied on Styled Components and
// Material UI providers respectively.
const themePalette = {
    // 🐸: The "palette.color.main" format is to follow Material UI default theme object.
    // You can see more about it here: https://mui.com/customization/theming/
    palette: {
        primary: {
            main: '#121212',
        },
        secondary: {
            main: '#FFF',
        },
        warning: {
            main: '#51942A',
        },
        error: {
            main: '#d32f2f',
        },
    },
    typography: {
        fontFamily: `"Exo", sans-serif`,
    },
}

export default themePalette

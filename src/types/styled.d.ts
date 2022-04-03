/* eslint @typescript-eslint/no-empty-interface: "off" */

// import styled components
import 'styled-components'

// color variables
import themePalette from '../styles/theme-palette'

// export of type by color variables
export type Theme = typeof themePalette

// declaration of the new Theme type as DefaultTheme
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}

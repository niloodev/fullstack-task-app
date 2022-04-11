/* eslint @typescript-eslint/no-empty-interface: "off" */

// Import Styled Components.
import 'styled-components'

// Color variables.
import themePalette from '../styles/theme-palette'

// Export of the Theme Palette type.
export type Theme = typeof themePalette

// Declaration of the new Theme type as DefaultTheme.
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}

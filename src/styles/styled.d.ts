/* eslint @typescript-eslint/no-empty-interface: "off" */

// import styled components
import 'styled-components'

// color variables
import colorsVar from './colors-var'

// export of type by color variables
export type Theme = typeof colorsVar

// declaration of the new Theme type as DefaultTheme
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}

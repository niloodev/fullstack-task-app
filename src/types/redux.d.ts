/* eslint @typescript-eslint/no-empty-interface: "off" */
import { InitialStateType } from '../lib/redux/store-initial-state'

// Type declaration of the new state type.
declare module 'react-redux' {
    export interface DefaultRootState extends InitialStateType {}
}
